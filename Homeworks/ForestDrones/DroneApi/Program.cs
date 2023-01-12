using System.Collections.Concurrent;
using System.Reflection;
using System.Text.Json.Serialization;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;

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
builder.Services.AddScoped<IValidator<Position>, FlyToTargetValidator>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseExceptionHandler(exceptionHandlerApp =>
    exceptionHandlerApp.Run(async context =>
    {
        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        if (exceptionHandlerPathFeature?.Error is InvalidDroneIdException)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            await context.Response.WriteAsync("Invalid drone ID, must be between 1 and 10");
        }
    }));

var dronePositions = new ConcurrentDictionary<int, Position>();
var examinedTrees = new ConcurrentBag<Position>();
var rand = new Random(3453452);
var damagedTrees = Enumerable.Range(0, 100)
    .Select(_ => new Position(rand.Next(-1000, 1000), rand.Next(-1000, 1000)))
    .Distinct()
    .ToArray();

app.MapGet("/drones", () => Results.Ok(Enumerable.Range(1, 10)
        .Select(i =>
        {
            if (dronePositions.TryGetValue(i, out var position))
            {
                return new DroneStatus(i, true, position);
            }

            return new DroneStatus(i, false);
        })))
.WithName("GetDroneStatus")
.WithSummary("Get the status of all drones")
.Produces<IEnumerable<DroneStatus>>(StatusCodes.Status200OK)
.WithOpenApi();

app.MapPost("/drones/{id}/activate", (int id) =>
{
    InvalidDroneIdException.ThrowIfInvalid(id);
    if (dronePositions.ContainsKey(id)) { return Results.Conflict(); }
    dronePositions[id] = new(0, 0);
    return Results.Ok();
})
.WithName("ActivateDrone")
.WithSummary("Activates an inactive drone")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.Produces(StatusCodes.Status409Conflict)
.WithOpenApi(o =>
{
    o.Responses[((int)StatusCodes.Status200OK).ToString()].Description = "Dron is active and located at 0/0";
    o.Responses[((int)StatusCodes.Status404NotFound).ToString()].Description = "Invalid drone ID, must be between 1 and 10";
    o.Responses[((int)StatusCodes.Status409Conflict).ToString()].Description = "Drone is already active";
    o.Parameters[0].Description = "The ID of the drone to activate.";
    return o;
});

app.MapPost("/drones/{id}/shutdown", (int id) =>
{
    InvalidDroneIdException.ThrowIfInvalid(id);
    if (!dronePositions.ContainsKey(id)) { return Results.Conflict(); }
    dronePositions.Remove(id, out _);
    return Results.NoContent();
})
.WithName("ShutdownDrone")
.WithSummary("Flys a drone home (to 0/0) and shuts it down")
.Produces(StatusCodes.Status204NoContent)
.Produces(StatusCodes.Status404NotFound)
.Produces(StatusCodes.Status409Conflict)
.WithOpenApi(o =>
{
    o.Responses[((int)StatusCodes.Status204NoContent).ToString()].Description = "Dron has flown home and has been shut down";
    o.Responses[((int)StatusCodes.Status404NotFound).ToString()].Description = "Invalid drone ID, must be between 1 and 10";
    o.Responses[((int)StatusCodes.Status409Conflict).ToString()].Description = "Drone is not active";
    o.Parameters[0].Description = "The ID of the drone to fly home and shut down.";
    return o;
});

app.MapPost("/drones/{id}/flyTo", async (int id, Position target, IValidator<Position> validator) =>
{
    InvalidDroneIdException.ThrowIfInvalid(id);
    if (!dronePositions.ContainsKey(id)) { return Results.Conflict(); }

    var validationResult = await validator.ValidateAsync(target);
    if (!validationResult.IsValid)
    {
        return Results.ValidationProblem(validationResult.ToDictionary());
    }

    // Simulate flying to position
    await Task.Delay(2000);
    dronePositions[id] = target;

    return Results.Ok(target);
})
.WithName("FlyToTarget")
.WithSummary("Flys a drone to a given target location")
.Produces<Position>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.Produces(StatusCodes.Status409Conflict)
.Produces(StatusCodes.Status400BadRequest)
.WithOpenApi(o =>
{
    o.Responses[((int)StatusCodes.Status200OK).ToString()].Description = "Drone has flown to the target location. The target location is returned.";
    o.Responses[((int)StatusCodes.Status404NotFound).ToString()].Description = "Invalid drone ID, must be between 1 and 10";
    o.Responses[((int)StatusCodes.Status409Conflict).ToString()].Description = "Drone is not active";
    o.Responses[((int)StatusCodes.Status400BadRequest).ToString()].Description = "Something is wrong with the target location";
    o.Parameters[0].Description = "The ID of the drone that should fly to the given location.";
    return o;
});

app.MapGet("/drones/{id}/scan", async (int id) =>
{
    InvalidDroneIdException.ThrowIfInvalid(id);
    if (!dronePositions.TryGetValue(id, out var droneLocation)) { return Results.Conflict(); }

    var random = new Random(id);
    var numberOfDamagedTrees = random.Next(50, 100);

    var visibleTrees = damagedTrees
        .Where(tree => Math.Abs(tree.X - droneLocation.X) <= 250 && Math.Abs(tree.Y - droneLocation.Y) <= 250)
        .Where(tree => !examinedTrees.Contains(tree))
        .ToArray();

    // Simulate scanning
    await Task.Delay(2000);

    return Results.Ok(new ScanResult(droneLocation, visibleTrees));
})
.WithName("Scan")
.WithSummary("Scans the area around the drone for damaged trees")
.WithDescription("""
    Scans the area around the drone for damaged trees. The drone scans a rectangular area 
    of 250 meters in all directions (north, south, east and west).
    """)
.Produces<ScanResult>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.Produces(StatusCodes.Status409Conflict)
.WithOpenApi(o =>
{
    o.Responses[((int)StatusCodes.Status200OK).ToString()].Description = "Coordinates of all damaged trees in the scanned area.";
    o.Responses[((int)StatusCodes.Status404NotFound).ToString()].Description = "Invalid drone ID, must be between 1 and 10";
    o.Responses[((int)StatusCodes.Status409Conflict).ToString()].Description = "Drone is not active";
    o.Parameters[0].Description = "The ID of the drone that should fly to the given location.";
    return o;
});

app.MapPost("/trees/markAsExamined", async (Position target, IValidator<Position> validator) =>
{
    var validationResult = await validator.ValidateAsync(target);
    if (!validationResult.IsValid)
    {
        return Results.ValidationProblem(validationResult.ToDictionary());
    }

    examinedTrees.Add(target);
    return Results.Ok(target);
})
.WithName("MarkAsExamined")
.WithSummary("Marks the tree at the given location as examined")
.Produces<Position>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status400BadRequest)
.WithOpenApi(o =>
{
    o.Responses[((int)StatusCodes.Status200OK).ToString()].Description = "Tree has been marked. The location of the tree is returned.";
    o.Responses[((int)StatusCodes.Status400BadRequest).ToString()].Description = "Something is wrong with the target location";
    return o;
});

app.Run();

/// <summary>
/// Represents the status of a drone. Position is only set if the drone is active.
/// </summary>
record struct DroneStatus(
    int Id, 
    bool IsActive, 
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    Position? Position = null);
/// <summary>
/// Represents a location. The coordinates must be between -750 and +750.
/// </summary>
record struct Position(int X, int Y);
class FlyToTargetValidator : AbstractValidator<Position>
{
    public FlyToTargetValidator()
    {
        RuleFor(x => x.X).InclusiveBetween(-750, 750);
        RuleFor(x => x.Y).InclusiveBetween(-750, 750);
    }
}
class InvalidDroneIdException : Exception
{
    public static void ThrowIfInvalid(int id)
    {
        if (id < 1 || id > 10) { throw new InvalidDroneIdException(); }
    }
}
record ScanResult(Position DronePosition, Position[] DamagedTrees);
