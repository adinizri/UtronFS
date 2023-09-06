using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Db
{
    public class UtronDbContext : DbContext
    {
        public UtronDbContext(DbContextOptions<UtronDbContext> options)
            : base(options) { }

        public DbSet<ParkingRecord> ParkingRecords { get; set; }
    }
}
