using System.Reflection;
using System.Text.Json.Serialization;
using FluentValidation;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.WebUtilities;
using SkiaSharp;

const string PROTECTION_PURPOSE = "BuildImageUrl";

#region Read and cache image files
var images = new Dictionary<Images, SKBitmap>();
void AddImage(Images image, string name)
{
    using (var imageStream = File.OpenRead(Path.Combine("Images", $"{name}.png")))
    {
        images[image] = SKBitmap.Decode(imageStream);
    }
}
AddImage(Images.BaseImage, "base");
AddImage(Images.Eye1, "eye1");
AddImage(Images.Eye2, "eye2");
AddImage(Images.Eye3, "eye3");
AddImage(Images.Hammer, "hammer");
AddImage(Images.Mouth1, "mouth1");
AddImage(Images.Mouth2, "mouth2");
AddImage(Images.Mouth3, "mouth3");
AddImage(Images.RightHand1, "rightHand1");
AddImage(Images.RightHand2, "rightHand2");
AddImage(Images.Tail, "tail");
#endregion

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var folder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
    var fileName = Path.GetFileNameWithoutExtension(Assembly.GetExecutingAssembly().Location);
    var filePath = Path.Combine(folder, $"{fileName}.xml");
    var includeXml = File.Exists(filePath);
    if (!includeXml)
    {
        filePath = Path.Combine(folder, "..", $"{fileName}.xml");
        includeXml = File.Exists(filePath);
    }

    if (includeXml)
    {
        options.IncludeXmlComments(filePath);
    }
});
builder.Services.AddCors(options => options.AddDefaultPolicy(builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
}));
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(options =>
{
	options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.AddScoped<IValidator<ImageOptions>, ImageOptionsValidator>();
builder.Services.AddDataProtection();
var app = builder.Build();

app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();

app.UseExceptionHandler(exceptionHandlerApp =>
    exceptionHandlerApp.Run(async context =>
    {
        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        if (exceptionHandlerPathFeature?.Error is InvalidImageOptionsException ex)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsync(ex.Message);
        }
    }));

app.MapPost("/build-image-url", (ImageOptions options, IValidator<ImageOptions> validator, 
    HttpContext context, IDataProtectionProvider provider, IConfiguration config) =>
{
    // Validate image options
    var validationResult = validator.Validate(options);
    if (!validationResult.IsValid)
    {
        throw new InvalidImageOptionsException(string.Join(',', validationResult.Errors.Select(e => $"{e.PropertyName}: {e.ErrorMessage}")));
    }

    // Combine valid until and image options into a single byte array
    using var stream = new MemoryStream();
    using (var writer = new BinaryWriter(stream))
    {
        var validUntil = DateTimeOffset.Now.AddMinutes(1).Ticks;
        writer.Write(validUntil);
        writer.Write((byte)options);
    }

    var bytes = stream.ToArray();

    // Encrypt the byte array and base64 encode it
    var protector = provider.CreateProtector(PROTECTION_PURPOSE);
    var protectedBytes = protector.Protect(bytes);
    var protectedString = WebEncoders.Base64UrlEncode(protectedBytes);

    // Build image URL
    var url = $"{config["ImageHttp"]}://{context.Request.Host}/img/{protectedString}";
    return Results.Ok(new BuildImageUrlResponse(url));
})
.WithName("BuildImageUrl")
.WithSummary("""
    Builds an image URL for the given image options. You can use the resulting URL e.g. in a HTML img tag.
    Note that the generated image URL is only valid for 1 minute!
    """)
.Produces<BuildImageUrlResponse>(StatusCodes.Status200OK)
.Produces<string>(StatusCodes.Status400BadRequest)
.WithOpenApi(o =>
{
    o.Responses[((int)StatusCodes.Status200OK).ToString()].Description = "Successfully built image URL";
    o.Responses[((int)StatusCodes.Status400BadRequest).ToString()].Description = "Invalid image options, see body for details.";
    return o;
});

app.MapGet("/get-random-image-options", () =>
    Results.Ok(new ImageOptions(
        Eye: (EyeType)Random.Shared.Next(1, 4),
        Mouth: (MouthType)Random.Shared.Next(1, 4),
        RightHand: (RightHandType)Random.Shared.Next(1, 3),
        HasTail: Random.Shared.Next(0, 2) == 0 ? false : true,
        HasHammer: Random.Shared.Next(0, 2) == 0 ? false : true
    )))
.WithName("GetRandomImageOptions")
.WithSummary("""
    Generates random image options. You can use the generated image options to
    build an image URL using the /build-image-url API endpoint.
    """)
.Produces<ImageOptions>(StatusCodes.Status200OK)
.WithOpenApi();

app.MapGet("/img/{imageId}", (string imageId, float? scale, IDataProtectionProvider provider) =>
{
    // Decode and decrypt the image options
    ImageOptions imageOptions;
    var protectedBytes = WebEncoders.Base64UrlDecode(imageId);
    var protector = provider.CreateProtector(PROTECTION_PURPOSE);
    var bytes = protector.Unprotect(protectedBytes);
    using var stream = new MemoryStream(bytes);
    using (var reader = new BinaryReader(stream))
    {
        var validUntil = reader.ReadInt64();
        if (validUntil < DateTimeOffset.Now.Ticks)
        {
            throw new InvalidImageOptionsException("Image URL has expired");
        }

        imageOptions = (ImageOptions)reader.ReadByte();
    }

    scale ??= 1f;
    if (scale < 0.1f || scale > 2f)
    {
        throw new InvalidImageOptionsException($"Invalid scale {scale}, must be between 0.1 and 2");
    }

    var width = (int)Math.Ceiling((double)(1024f * scale));
    var height = (int)Math.Ceiling((double)(1124f * scale));
    var origin = new SKPoint(0, 0);

    using var surface = SKSurface.Create(new SKImageInfo(width, height));
    using var canvas = surface.Canvas;
    canvas.Clear(SKColors.Transparent);

    canvas.Scale(scale.Value);

    if (imageOptions.HasHammer) { canvas.DrawBitmap(images[Images.Hammer], origin); }
    if (imageOptions.HasTail) { canvas.DrawBitmap(images[Images.Tail], origin); }
    canvas.DrawBitmap(images[Images.BaseImage], origin);
    if (imageOptions.Eye != EyeType.NoEye) { canvas.DrawBitmap(images[Images.Eye1 + ((int)imageOptions.Eye - 1)], origin); }
    if (imageOptions.Mouth != MouthType.NoMouth) { canvas.DrawBitmap(images[Images.Mouth1 + ((int)imageOptions.Mouth - 1)], origin); }
    if (imageOptions.RightHand != RightHandType.NoHand) { canvas.DrawBitmap(images[Images.RightHand1 + ((int)imageOptions.RightHand - 1)], origin); }

    using var resultImage = surface.Snapshot();
    using var data = resultImage.Encode(SKEncodedImageFormat.Png, 75);

    return Results.File(data.ToArray(), "image/png");
})
.WithName("GetImage")
.WithSummary("""
    Returns the image. Use this endpoint e.g. in a HTML img tag. Note that image URLs created with 
    the /build-image-url API endpoint are only valid for 1 minute!
    """)
.Produces(StatusCodes.Status200OK)
.Produces<string>(StatusCodes.Status400BadRequest)
.WithOpenApi(o =>
{
    o.Responses[((int)StatusCodes.Status200OK).ToString()].Description = "Successfully built image.";
    o.Responses[((int)StatusCodes.Status400BadRequest).ToString()].Description = "Invalid image options, see body for details.";
    o.Parameters[0].Description = """
        Image ID that must have been generated with the */build-image-url* API endpoint.
        Note that image IDs created with the */build-image-url* API endpoint are **only valid for 1 minute**!
        """;
    o.Parameters[1].Description = "Image scaling factor, must be between 0.1 and 2. Defaults to 1.";
    return o;
});

app.Run();

enum Images
{
    BaseImage, Eye1, Eye2, Eye3, Hammer, Mouth1, Mouth2,
    Mouth3, RightHand1, RightHand2, Tail,
}

enum EyeType { NoEye = 0, HalfOpen = 1, Closed = 2, Open = 3, }
enum MouthType { NoMouth = 0, Happy = 1, Normal = 2, Unhappy = 3, }
enum RightHandType { NoHand = 0, Normal = 1, Victory = 2, }

record ImageOptions(EyeType Eye, bool HasHammer, MouthType Mouth,
    RightHandType RightHand, bool HasTail)
{
    public ImageOptions() : this(EyeType.NoEye, false, MouthType.NoMouth, RightHandType.NoHand, false) { }

    public static implicit operator byte(ImageOptions dto) =>
        (byte)((int)dto.Eye
        | (int)(dto.HasHammer ? 1 : 0) << 2
        | (int)dto.Mouth << 3
        | (int)dto.RightHand << 5
        | (int)(dto.HasTail ? 1 : 0) << 7);

    public static implicit operator ImageOptions(byte value)
    {
        var eye = (EyeType)(value & 0b11);
        if (!Enum.IsDefined(typeof(EyeType), eye))
        {
            throw new InvalidImageOptionsException($"Invalid eye type {(int)eye}");
        }

        var hasHammer = (value >> 2 & 0b1) == 1;

        var mouth = (MouthType)(value >> 3 & 0b11);
        if (!Enum.IsDefined(typeof(MouthType), mouth))
        {
            throw new InvalidImageOptionsException($"Invalid mouth type {(int)mouth}");
        }

        var rightHand = (RightHandType)(value >> 5 & 0b11);
        if (!Enum.IsDefined(typeof(RightHandType), rightHand))
        {
            throw new InvalidImageOptionsException($"Invalid right hand type {(int)rightHand}");
        }

        var hasTail = (value >> 7 & 0b1) == 1;

        return new ImageOptions(eye, hasHammer, mouth, rightHand, hasTail);
    }
}

record BuildImageUrlResponse(string Url)
{
    /// <summary>
    /// The URL to the generated image. Note that this URL is only valid for 1 minute!
    /// </summary>
    public string Url { get; init; } = Url;
}

class ImageOptionsValidator : AbstractValidator<ImageOptions>
{
    public ImageOptionsValidator()
    {
        RuleFor(x => x.Eye).IsInEnum();
        RuleFor(x => x.Mouth).IsInEnum();
        RuleFor(x => x.RightHand).IsInEnum();
    }
}

class InvalidImageOptionsException : Exception
{
    public InvalidImageOptionsException(string message) : base(message) { }
}
