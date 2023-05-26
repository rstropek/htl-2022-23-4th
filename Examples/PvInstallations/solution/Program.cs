using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ScottPlot;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PvDbContext>(options =>
    options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]));

var app = builder.Build();

app.MapPost("/installations", async (PvInstallationDto installationDto, PvDbContext dbContext) =>
{
    // Note that you can also use Fluentvalidation for parameter validation. It would even be better 
    // to use it, because it would allow you to reuse the validation logic in other places.
    // However, for the sake of simplicity, we will do the validation here manually. Both options
    // are fine for the exam.
    if (installationDto.Longitude is < -180 or > 180) { return Results.BadRequest("Longitude must be between -180 and 180"); }
    if (installationDto.Latitude is < -90 or > 90) { return Results.BadRequest("Latitude must be between -90 and 90"); }
    if (string.IsNullOrWhiteSpace(installationDto.Address)) { return Results.BadRequest("Address must be provided"); }
    if (string.IsNullOrWhiteSpace(installationDto.OwnerName)) { return Results.BadRequest("Owner name must be provided"); }
    if (installationDto.Address.Length > 1024) { return Results.BadRequest("Address must be less than 1024 characters"); }
    if (installationDto.OwnerName.Length > 512) { return Results.BadRequest("Owner name must be less than 512 characters"); }
    if (!string.IsNullOrWhiteSpace(installationDto.Comments) && installationDto.Comments.Length > 1024) { return Results.BadRequest("Comments must be less than 1024 characters"); }

    var installation = new PvInstallation
    {
        Longitude = installationDto.Longitude,
        Latitude = installationDto.Latitude,
        Address = installationDto.Address,
        OwnerName = installationDto.OwnerName,
        Comments = installationDto.Comments
    };

    await dbContext.PvInstallations.AddAsync(installation);

    await dbContext.InstallationLogs.AddAsync(new()
    {
        Action = "Create",
        Timestamp = DateTime.UtcNow,
        PvInstallation = installation,
        NewValue = JsonSerializer.Serialize(installation)
    });

    await dbContext.SaveChangesAsync();

    return Results.Json(installation, statusCode: StatusCodes.Status201Created);
});

app.MapPost("/installations/{id}/deactivate", async (int id, PvDbContext dbContext) =>
{
    var installation = await dbContext.PvInstallations.FindAsync(id);
    if (installation == null) { return Results.NotFound(); }
    if (!installation.IsActive) { return Results.BadRequest("Installation is already inactive"); }

    installation.IsActive = false;

    await dbContext.InstallationLogs.AddAsync(new()
    {
        Action = "Activate/Deactivate",
        Timestamp = DateTime.UtcNow,
        PvInstallation = installation,
        PreviousValue = "true",
        NewValue = "false"
    });

    await dbContext.SaveChangesAsync();

    return Results.Ok(installation);
});

app.MapPost("/installations/{id}/reports", async (int id, ProductionReportDto reportDto, PvDbContext dbContext) =>
{
    if (reportDto.ProducedWattage < 0) { return Results.BadRequest("Produced wattage must be greater than or equal to 0"); }
    if (reportDto.HouseholdWattage < 0) { return Results.BadRequest("Household wattage must be greater than or equal to 0"); }
    if (reportDto.BatteryWattage < 0) { return Results.BadRequest("Battery wattage must be greater than or equal to 0"); }
    if (reportDto.GridWattage < 0) { return Results.BadRequest("Grid wattage must be greater than or equal to 0"); }

    var installation = await dbContext.PvInstallations.FindAsync(id);
    if (installation == null) { return Results.NotFound(); }

    // Note that you could optionally check if there is already a report for the current minute.
    // However, this was not explicitly required, so we will skip it for the sake of simplicity.

    var report = new ProductionReport
    {
        Timestamp = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day, DateTime.UtcNow.Hour, DateTime.UtcNow.Minute, 0),
        PvInstallationId = id,
        ProducedWattage = reportDto.ProducedWattage,
        HouseholdWattage = reportDto.HouseholdWattage,
        BatteryWattage = reportDto.BatteryWattage,
        GridWattage = reportDto.GridWattage
    };

    dbContext.ProductionReports.Add(report);
    await dbContext.SaveChangesAsync();

    return Results.Json(report, statusCode: StatusCodes.Status201Created);
});

app.MapGet("/installations/{id}/reports", async (int id, DateTime timestamp, int duration, PvDbContext dbContext) =>
{
    if (duration <= 0) { return Results.BadRequest("Duration must be greater than 0"); }

    var installation = await dbContext.PvInstallations.FindAsync(id);
    if (installation == null) { return Results.NotFound(); }

    var totalProducedWattage = await dbContext.ProductionReports
        .Where(r => r.PvInstallationId == id)
        .Where(r => r.Timestamp >= timestamp && r.Timestamp < timestamp.AddMinutes(duration))
        .SumAsync(r => r.ProducedWattage);

    return Results.Ok(new { totalProducedWattage });
});

app.MapGet("/installations/{id}/timeline", async (int id, DateTime startTimestamp, int duration, int page, PvDbContext dbContext) =>
{
    if (duration <= 0) { return Results.BadRequest("Duration must be greater than 0"); }
    if (page < 1) { return Results.BadRequest("Page must be greater than 1"); }

    var installation = await dbContext.PvInstallations.FindAsync(id);
    if (installation == null) { return Results.NotFound(); }

    return Results.Ok(GetTimeline(id, startTimestamp, duration, page, dbContext));
});

app.MapGet("/installations/{id}/chart", async (int id, DateTime startTimestamp, int duration, int page, PvDbContext dbContext) =>
{
    if (duration <= 0) { return Results.BadRequest("Duration must be greater than 0"); }
    if (page < 1) { return Results.BadRequest("Page must be greater than 1"); }

    var installation = await dbContext.PvInstallations.FindAsync(id);
    if (installation == null) { return Results.NotFound(); }

    var timeline = (await GetTimeline(id, startTimestamp, duration, page, dbContext)).ToArray();

    Plot timelinePlot = new();
    var dataX = timeline.Select(r => r.Timestamp.ToOADate()).ToArray();
    var dataY = timeline.Select(r => (double)r.ProducedWattage).ToArray();
    timelinePlot.Add.Scatter(dataX, dataY).Label = "Produced";
    dataY = timeline.Select(r => (double)r.HouseholdWattage).ToArray();
    timelinePlot.Add.Scatter(dataX, dataY).Label = "Household";
    dataY = timeline.Select(r => (double)r.BatteryWattage).ToArray();
    timelinePlot.Add.Scatter(dataX, dataY).Label = "Battery";
    dataY = timeline.Select(r => (double)r.GridWattage).ToArray();
    timelinePlot.Add.Scatter(dataX, dataY).Label = "Grid";
    timelinePlot.Axes.DateTimeTicks(ScottPlot.Edge.Bottom);

    var img = timelinePlot.GetImage(1024, 800);
    var bytes = img.GetImageBytes();

    return Results.File(bytes, "image/png");
});

async Task<IEnumerable<ProductionReport>> GetTimeline(int id, DateTime startTimestamp, int duration, int page, PvDbContext dbContext)
{
    const int pageSize = 60;
    var endTimestamp = startTimestamp.AddMinutes(Math.Min(duration, pageSize * page));
    startTimestamp += TimeSpan.FromMinutes(pageSize * (page - 1));

    var timelineData = await dbContext.ProductionReports
        .Where(r => r.PvInstallationId == id)
        .Where(r => r.Timestamp >= startTimestamp && r.Timestamp < endTimestamp)
        .ToListAsync();

    for (; startTimestamp < endTimestamp; startTimestamp = startTimestamp.AddMinutes(1))
    {
        if (!timelineData.Any(r => r.Timestamp == startTimestamp))
        {
            timelineData.Add(new() { Timestamp = startTimestamp });
        }
    }
    
    return timelineData.OrderBy(r => r.Timestamp);
}

app.Run();

record PvInstallationDto(float Longitude, float Latitude, string Address, string OwnerName, string Comments);
record ProductionReportDto(float ProducedWattage, float HouseholdWattage, float BatteryWattage, float GridWattage);
