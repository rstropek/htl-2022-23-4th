using System.Text;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.WebUtilities;
using SkiaSharp;

const string PROTECTION_PURPOSE = "BuildImageUrl";

// Images from https://www.kenney.nl/assets/monster-builder-pack
var images = new Dictionary<string, SKBitmap>();
void AddImage(string name)
{
    var fileName = Path.GetFileName(name);
    using (var imageStream = File.OpenRead(Path.Combine("Images", fileName)))
    {
        images[fileName] = SKBitmap.Decode(imageStream);
    }
}
Directory.EnumerateFiles("Images").ToList().ForEach(AddImage);

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => options.AddDefaultPolicy(builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
}));
builder.Services.AddDataProtection();
var app = builder.Build();

app.MapPost("/build-image-url", (ImageOptions options, HttpContext context, IDataProtectionProvider provider, IConfiguration config) =>
{
    var optionsString = options.ToShortString();
    var optionsBytes = Encoding.UTF8.GetBytes(optionsString);
    var protector = provider.CreateProtector(PROTECTION_PURPOSE);
    var protectedBytes = protector.Protect(optionsBytes);
    var protectedString = WebEncoders.Base64UrlEncode(protectedBytes);

    var url = $"{context.Request.Scheme}://{context.Request.Host}/img/{protectedString}";
    context.Response.Headers.Location = url;
    return Results.Ok(new BuildImageUrlResponse(url));
});

app.MapGet("/img/{imageId}", (string imageId, float? scale, IDataProtectionProvider provider) =>
{
    var protectedBytes = WebEncoders.Base64UrlDecode(imageId);
    var protector = provider.CreateProtector(PROTECTION_PURPOSE);
    var bytes = protector.Unprotect(protectedBytes);
    var optionsString = Encoding.UTF8.GetString(bytes);
    var imageOptions = ImageOptions.FromShortString(optionsString);

    scale ??= 1f;

    var width = (int)Math.Ceiling((double)(500f * scale));
    var height = (int)Math.Ceiling((double)(500f * scale));
    var origin = new SKPoint(0, 0);

    using var surface = SKSurface.Create(new SKImageInfo(width, height));
    using var canvas = surface.Canvas;
    canvas.Clear(SKColors.Transparent);

    canvas.Scale(scale.Value);

    static void DrawImage(SKCanvas canvas, SKBitmap image, float x, float y, bool flipped = false, float rotation = 0f)
    {
        canvas.Save();
        canvas.Translate(x, y);
        if (flipped) { canvas.Scale(-1, 1); }
        canvas.RotateDegrees(rotation);
        canvas.DrawBitmap(image, new SKPoint(0, 0)); 
        canvas.Restore();
    }

    DrawImage(canvas, images[$"leg_{imageOptions.Color}{imageOptions.Leg}.png"], 260f, 250f);
    DrawImage(canvas, images[$"leg_{imageOptions.Color}{imageOptions.Leg}.png"], 210f, 250f, true, -25f);
    DrawImage(canvas, images[$"body_{imageOptions.Color}{imageOptions.Body}.png"], 150f, 50f); 

    using var resultImage = surface.Snapshot();
    using var data = resultImage.Encode(SKEncodedImageFormat.Png, 75);

    return Results.File(data.ToArray(), "image/png");
});

app.Run();

record ImageOptions(string Color, char Body, char Leg)
{
    public string ToShortString() => $"{Color}-{Body}-{Leg}";
    public static ImageOptions FromShortString(string shortString)
    {
        var parts = shortString.Split('-');
        return new ImageOptions(parts[0], parts[1][0], parts[2][0]);
    }
}

record BuildImageUrlResponse(string Url)
{
    public string Url { get; init; } = Url;
}