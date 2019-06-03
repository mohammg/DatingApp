using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingReposatry : IDatingReposatry
    {
        private readonly DataDbContext context;
        public DatingReposatry(DataDbContext context)
        {
            this.context = context;

        }
        public void Add<T>(T entity) where T : class
        {
          context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
           var user=await context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(u=>u.Id==id);
          
           return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
           var user=await context.Users.Include(p=>p.Photos).ToListAsync();
          
           return user;
        }

        public async Task<bool> SaveAll()
        {
           return await context.SaveChangesAsync() >0;
        }
    }
}