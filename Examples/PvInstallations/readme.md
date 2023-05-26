# Programming Exercise

![PV Installation](./hero-image.png)

This exercise will require you to create an *ASP.NET Core Minimal API* with *Entity Framework Core* for maintaining a photovoltaic installations database. The database will store data related to photovoltaic installations, and the API will expose endpoints for creating, updating, and querying this data.

## Requirements

Your solution should include the following components:

1. A `PvInstallation` entity with the following properties:
   * `Id`: A unique identifier for the installation, assigned by the system
   * `Longitude`: A float representing the installation's longitude (mandatory)
   * `Latitude`: A float representing the installation's latitude (mandatory)
   * `Address`: A string representing the installation's address (mandatory, maximum length 1024 characters)
   * `OwnerName`: A string representing the owner's name (mandatory, maximum length 512 characters)
   * `IsActive`: A boolean indicating whether the installation is active
   * `Comments`: Optional comments (maximum length 1024 characters)

2. A `ProductionReport` entity with the following properties:
   * `Id`: A unique identifier for the report record, assigned by the system (mandatory)
   * `Timestamp`: A date and time value in UTC representing when the data was collected (mandatory)
   * `ProducedWattage`: A float representing the wattage produced by the installation in the minute after the `Timestamp` (mandatory)
   * `HouseholdWattage`: A float representing the wattage used by the household in the minute after the `Timestamp` (mandatory)
   * `BatteryWattage`: A float representing the wattage stored in the batteries in the minute after the `Timestamp` (mandatory)
   * `GridWattage`: A float representing the wattage fed into the grid in the minute after the `Timestamp` (mandatory)
   * Relation to the installation that produced the report (mandatory)

3. An API with the following endpoints:
   * POST `/installations`: An endpoint that accepts a JSON payload with the longitude, latitude, address, owner name, and optional comments of a new installation. This endpoint should create a new `PvInstallation` and return at least its `Id` (you can return the entire installation record if you want).
   * POST `/installations/{id}/deactivate`: An endpoint that sets an installation's `IsActive` flag to `false`.
   * POST `/installations/{id}/reports`: An endpoint that accepts a JSON payload with produced wattage, household wattage, battery wattage, and grid wattage. The timestamp is filled with the system time (current UTC system time truncated to the current minute; e.g. *2023-05-25T17:02:30* becomes *2023-05-25T17:02:00*). This endpoint should create a new `ProductionReport` for the installation with the provided Id.
   * GET `/installations/{id}/reports`: An endpoint that accepts query parameters for a start timestamp and a duration in minutes. This endpoint should return the sum of the `ProducedWattage` of the installation with the provided `Id` during the specified period.

4. A `DbContext` class, `PvDbContext`, which includes `DbSet` properties for `PvInstallation` and `ProductionReport` entities.

All data should be stored in a SQL Server database using Entity Framework Core.

Note that test HTTP requests are provided in [requests.http](./requests.http).

Here is a diagram of the database schema:

[![](https://mermaid.ink/img/pako:eNp9UstOwzAQ_BXL59LSFgrNjZegEi8BEhLqZRtvEkuxN7LXRVWbf8fpgwIBfLDs2d3RjD1LmZJCmUh0lxpyB2ZqRVyP84n1DGUJrMmK1ergYLUUj45USBvkCStyLBJRgP91YrlBm6Uti4na37OSgMUt2VxzUNgqRILvuGenbS7OlHLofQt_eLfo7sF8mZgRlWLiz6LWeZvogoxBy1umeqv_p7d_HChgZG1QvMQtmjbVTxMbNlSvwAx5y-MNBY8FlX_VzyOMbvFH9drp9mCj8fsf7BRHg7IjDToDWsWvXhubSi4wPplM4lFhBqHkqZzaOraGqjF4pTSTk0kGpceOhMD0vLCpTNgF3DVtQ_PZFfUpjENLyYuqyVWuPUfKlGym8wYProxwwVz5pNdryt2YgyLMuimZnteqAMfFfDzqjQajUxgMcXQyhOPhUKWz_vg0Gxz1M3Vy2B-ArOuOrMC-Ee0F4Fr13SbU62zXH9Bx7iQ?type=png)](https://mermaid.live/edit#pako:eNp9UstOwzAQ_BXL59LSFgrNjZegEi8BEhLqZRtvEkuxN7LXRVWbf8fpgwIBfLDs2d3RjD1LmZJCmUh0lxpyB2ZqRVyP84n1DGUJrMmK1ergYLUUj45USBvkCStyLBJRgP91YrlBm6Uti4na37OSgMUt2VxzUNgqRILvuGenbS7OlHLofQt_eLfo7sF8mZgRlWLiz6LWeZvogoxBy1umeqv_p7d_HChgZG1QvMQtmjbVTxMbNlSvwAx5y-MNBY8FlX_VzyOMbvFH9drp9mCj8fsf7BRHg7IjDToDWsWvXhubSi4wPplM4lFhBqHkqZzaOraGqjF4pTSTk0kGpceOhMD0vLCpTNgF3DVtQ_PZFfUpjENLyYuqyVWuPUfKlGym8wYProxwwVz5pNdryt2YgyLMuimZnteqAMfFfDzqjQajUxgMcXQyhOPhUKWz_vg0Gxz1M3Vy2B-ArOuOrMC-Ee0F4Fr13SbU62zXH9Bx7iQ)

## Advanced Programming Exercise Requirements

This exercise is designed to challenge high-performing students with additional advanced requirements.

### Data Validation

Implement comprehensive data validation on the server-side. This should include checks to ensure:

1. Latitude and longitude values are within valid ranges (i.e., -90 to +90 for latitude and -180 to +180 for longitude).
1. All wattage values are non-negative.
1. The duration in minutes is a positive integer.
1. All mandatory input strings are not empty or excessively long.

You should return a meaningful HTTP status code and error message in the response body when validation fails.

### New Timeline API Endpoint

GET `/installations/{id}/timeline`: An endpoint that accepts a start timestamp (UTC) and a duration in minutes as query parameters. This endpoint should return wattage values for each minute in the specified period.

1. For each minute within the duration, you should return a record with the produced wattage, household wattage, battery wattage, and grid wattage. If no data is available for a given minute, return a record with zero wattages.

2. Implement paging on this endpoint with a fixed page size of 60 minutes.

### InstallationLog Entity

Create a new `InstallationLog` entity to track changes to the installation metadata. This entity should have the following properties:

1. `Id`: A unique identifier for the log entry.
1. `Timestamp`: A date and time value in UTC representing when the change was made.
1. `Action`: A string describing the change (e.g., "created", "activate/deactivate").
1. `PreviousValue`: A string representing the previous value of the changed field, if applicable (optional).
1. `NewValue`: A string representing the new value of the changed field, if applicable (optional).
1. Relation to the installation that produced the report (mandatory)

Add new log entries whenever an installation is created or an installation is deactivated.

Here is the updated ER diagram:

[![](https://mermaid.ink/img/pako:eNqFU11v2zAM_CuCntNmSbq09VvXDmuArgu2YQWKvDAWbQuQREOiUgSJ__vkfKxpjGR6MKwjebgjxZXMSaHMJPoHDaUHO3Mineli4gKDMcCanFivLy7WKzH1pGLeIj-xJs8iExWEcxWH2BOVZwpWW7Q92rGYqPd7YQhYPJErNUeFnUAi-IgH9tqV4k4pjyF08B9vDv0z2IOKOZERk3CXzC26RPdkLTreMTU7_cfNOONAASNri-J3-iTTtj42sWVD9QLMUHY8PlIMWJE5Ff-SYPTLE9FvXncLW40fZ7BXvDN4PLsz_k5z_c_9flSbRnbgqceFTtb_gIndsTzj20EgqZY9adFb0Cq96I3cmeQK06Blln4VFhANz-TMNSk11q2wr0ozeZkVYAL2JESmX0uXy4x9xH3Sbjf-ZaWuKkxFK8nLul2fUgdOlDm5QpctHr1JcMVch6zfb8OX6fVWcX6Zk-0HrSrwXC1ux_3xcHwDwxGOr0fweTRS-Xxwe1MMrwaFuv40GIJsmp6swb0SvQvAjerv293drHDzFz6HOBE?type=png)](https://mermaid.live/edit#pako:eNqFU11v2zAM_CuCntNmSbq09VvXDmuArgu2YQWKvDAWbQuQREOiUgSJ__vkfKxpjGR6MKwjebgjxZXMSaHMJPoHDaUHO3Mineli4gKDMcCanFivLy7WKzH1pGLeIj-xJs8iExWEcxWH2BOVZwpWW7Q92rGYqPd7YQhYPJErNUeFnUAi-IgH9tqV4k4pjyF08B9vDv0z2IOKOZERk3CXzC26RPdkLTreMTU7_cfNOONAASNri-J3-iTTtj42sWVD9QLMUHY8PlIMWJE5Ff-SYPTLE9FvXncLW40fZ7BXvDN4PLsz_k5z_c_9flSbRnbgqceFTtb_gIndsTzj20EgqZY9adFb0Cq96I3cmeQK06Blln4VFhANz-TMNSk11q2wr0ozeZkVYAL2JESmX0uXy4x9xH3Sbjf-ZaWuKkxFK8nLul2fUgdOlDm5QpctHr1JcMVch6zfb8OX6fVWcX6Zk-0HrSrwXC1ux_3xcHwDwxGOr0fweTRS-Xxwe1MMrwaFuv40GIJsmp6swb0SvQvAjerv293drHDzFz6HOBE)

## Special Programming Exercise Requirements for Advanced Students

For exceptionally talented students seeking an additional challenge, this task will require you to utilize the [ScottPlot](https://www.scottplot.net/) library to generate a line chart representing the wattage data over time. This plot should be returned directly as image data in the HTTP response body.

### Line Chart API Endpoint

⚠️ If you want to run your API on Linux, you must use the latest beta version 5.x of the `ScottPlot` NuGet package. Additionally, you must install the NuGet package `SkiaSharp.NativeAssets.Linux.NoDependencies`.

GET `/installations/{id}/chart`: An endpoint that accepts a start timestamp (UTC) and a duration in minutes as query parameters, similar to the `/installations/{id}/timeline` endpoint. However, this endpoint will generate a line chart using the ScottPlot library to visualize the wattage data over time.

Here are some specifications:

1. The X-axis should represent the time from the start timestamp up to the duration in minutes.
2. The Y-axis should represent the wattage values.
3. Draw four different lines, each representing the `ProducedWattage`, `HouseholdWattage`, `BatteryWattage`, and `GridWattage` respectively.
4. Make sure to distinguish between the four lines, either by using different colors or line styles.
5. Convert the generated plot to a Bitmap, and then to a byte array. Write this byte array directly to the HTTP response body.

Remember to set the appropriate `Content-Type` header (e.g., `image/png`) in the response (we had that in our [*CharacterBuilder* example](https://github.com/rstropek/htl-2022-23-4th/blob/c23d4477ac7c70d35bbc1f8f8da86e0b7b7e079d/Examples/CharacterBuilder/api/Program.cs#L190)). This will allow the image to be displayed correctly when the endpoint is accessed in a web browser.

You can learn more about creating plots with ScottPlot on its [website](https://www.scottplot.net/). Here is a code snippet that might also help you:

```csharp
// ...

Plot timelinePlot = new();
// ...
// Provide data points for X axis in dataX (must all a double array) and
// data points for Y axis in dataY (must all a double array). To convert
// DateTime into double, you can use DateTime.ToOADate().
// ...
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
```

## Sample Solution

You can find a sample solution in [https://github.com/rstropek/htl-2022-23-4th/tree/main/Examples/PvInstallations/solution](https://github.com/rstropek/htl-2022-23-4th/tree/main/Examples/PvInstallations/solution).
