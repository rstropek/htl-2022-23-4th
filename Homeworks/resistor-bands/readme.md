# Resitor Bands

## Introduction

In this exercise, you have to build a web API that helps makers to do calculations about resistors. You API can convert bands to resistor values and vice versa.

## Functional Requirements

* At [https://app.swaggerhub.com/apis/rstropek/ResistorColorCoding/1.0](https://app.swaggerhub.com/apis/rstropek/ResistorColorCoding/1.0), you find a *Open API Specification* document (aka *Swagger* or *OAS*) for the API. You implemented API has to be able to generate an OAS document as similarly as possible to the given specification. Use [*Swashbuckle*](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/openapi?view=aspnetcore-7.0#microsoftaspnetcoreopenapi-nuget-package) to achieve that.

* First, implement the *Colors* endpoints and make sure that your implementation works. Also check if the OAS document is correctly generated.

* Next, implement the *value-from-bands* endpoints. They do the same, but one uses POST and one GET. In practice, this is sometimes done because of technical reasons. Some platforms might not be able to send POST requests, so people implement a GET-version, too.

* Lastly, implement the *bands-from-value* endpoint. Note that this is the most complicated algorithm of the sample.

## Non-Functional Requirements

* Use C# and ASP.NET Core 7

* Tip: Try to put the calculation logic into a *service* class using [*Dependency Injection*](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-7.0#access-the-dependency-injection-di-container).

## Extra Exercise

* Implement a simple Angular client for the API.

* Still not enough? Try to [generate a *TypeScript Angular* client for the OAS document](https://openapi-generator.tech/#try) and use it in your Angular app.
