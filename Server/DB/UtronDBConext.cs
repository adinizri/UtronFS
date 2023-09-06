using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Db
{
    public class UtronDbContext : DbContext
    {
        public UtronDbContext(DbContextOptions<UtronDbContext> options)
            : base(options) { }

        public DbSet<ParkingRecord> ParkingRecords { get; set; }

        internal Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     // Replace "YourConnectionString" with the connection string to your MDF file.
        //     optionsBuilder.UseSqlServer("Server=localhost;Database=master;Trusted_Connection=True;");
        // }
    }
}
