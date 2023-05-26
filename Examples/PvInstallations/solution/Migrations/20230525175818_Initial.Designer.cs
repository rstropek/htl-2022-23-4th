﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace solution.Migrations
{
    [DbContext(typeof(PvDbContext))]
    [Migration("20230525175818_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("InstallationLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Action")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NewValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PreviousValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PvInstallationId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("PvInstallationId");

                    b.ToTable("InstallationLogs");
                });

            modelBuilder.Entity("ProductionReport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<float>("BatteryWattage")
                        .HasColumnType("real");

                    b.Property<float>("GridWattage")
                        .HasColumnType("real");

                    b.Property<float>("HouseholdWattage")
                        .HasColumnType("real");

                    b.Property<float>("ProducedWattage")
                        .HasColumnType("real");

                    b.Property<int>("PvInstallationId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("PvInstallationId");

                    b.ToTable("ProductionReports");
                });

            modelBuilder.Entity("PvInstallation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<string>("Comments")
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<float>("Latitude")
                        .HasColumnType("real");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

                    b.Property<string>("OwnerName")
                        .IsRequired()
                        .HasMaxLength(512)
                        .HasColumnType("nvarchar(512)");

                    b.HasKey("Id");

                    b.ToTable("PvInstallations");
                });

            modelBuilder.Entity("InstallationLog", b =>
                {
                    b.HasOne("PvInstallation", "PvInstallation")
                        .WithMany()
                        .HasForeignKey("PvInstallationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PvInstallation");
                });

            modelBuilder.Entity("ProductionReport", b =>
                {
                    b.HasOne("PvInstallation", "PvInstallation")
                        .WithMany("ProductionReports")
                        .HasForeignKey("PvInstallationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PvInstallation");
                });

            modelBuilder.Entity("PvInstallation", b =>
                {
                    b.Navigation("ProductionReports");
                });
#pragma warning restore 612, 618
        }
    }
}
