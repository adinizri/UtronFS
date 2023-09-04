using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class CreateInitial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParkingRecords",
                columns: table => new
                {
                    LicensePlateID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ParkingDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LotNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingRecords", x => x.LicensePlateID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ParkingRecords");
        }
    }
}
