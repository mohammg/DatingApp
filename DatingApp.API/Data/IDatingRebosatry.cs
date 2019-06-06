using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingReposatry
    {
        void Add<T>(T entity) where T:class;
        void Delete<T> (T entity) where T:class;
        Task<Photo> GetPhoto(int id);
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        
    }
}