using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Data.Migrations
{
    public partial class PhotoPuplicKeyCol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PuplicId",
                table: "Photos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PuplicId",
                table: "Photos");
        }
    }
}
