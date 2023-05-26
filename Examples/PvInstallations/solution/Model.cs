using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class PvInstallation
{
    public int Id { get; set; }

    public float Longitude { get; set; }

    public float Latitude { get; set; }

    [MaxLength(1024)]
    public string Address { get; set; } = string.Empty;

    [MaxLength(512)]
    public string OwnerName { get; set; } = string.Empty;

    public bool IsActive { get; set; } = true;

    [MaxLength(1024)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Comments { get; set; }

    [JsonIgnore]
    public List<ProductionReport> ProductionReports { get; set; } = new();
}

public class ProductionReport
{
    public int Id { get; set; }

    public DateTime Timestamp { get; set; }

    public float ProducedWattage { get; set; }

    public float HouseholdWattage { get; set; }

    public float BatteryWattage { get; set; }

    public float GridWattage { get; set; }

    [JsonIgnore]
    public int PvInstallationId { get; set; }

    [JsonIgnore]
    public PvInstallation? PvInstallation { get; set; }
}

public class InstallationLog  
{  
    public int Id { get; set; }  

    public DateTime Timestamp { get; set; }  

    public string Action { get; set; }  = string.Empty; 

    public string? PreviousValue { get; set; }

    public string? NewValue { get; set; }
 
    public int PvInstallationId { get; set; }  

    public PvInstallation? PvInstallation { get; set; }  
}  
