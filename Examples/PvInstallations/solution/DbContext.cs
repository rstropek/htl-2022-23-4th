
using Microsoft.EntityFrameworkCore;

public class PvDbContext : DbContext
{
    public DbSet<PvInstallation> PvInstallations => Set<PvInstallation>();
    public DbSet<ProductionReport> ProductionReports => Set<ProductionReport>();
    public DbSet<InstallationLog> InstallationLogs => Set<InstallationLog>();

    public PvDbContext(DbContextOptions<PvDbContext> options) : base(options) { }
}
