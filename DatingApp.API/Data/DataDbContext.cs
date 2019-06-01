using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options):base(options)
        {

        }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
    }
}