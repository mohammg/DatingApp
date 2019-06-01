using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthReposatry : IAuthReposatry
    {
        private readonly DataDbContext _context;
        public AuthReposatry(DataDbContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            username=username.ToLower();
           var user= await _context.Users.FirstOrDefaultAsync(a=>a.Username==username);
           if(user== null)
           return null;
           if(!VerifayPassword(password,user.PasswordHash,user.PasswordSalt))
           return null;

           return user;
        }

        private bool VerifayPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
             using (var hmac= new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                
          var computedHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
          for (int i = 0; i < computedHash.Length; i++)
          {
              if (computedHash[i]!=passwordHash[i])
              return false;
          }
          return true;
            } 
        }

        public async Task<User> Register(User user, string password)
        {
           byte[] passwordHash,passwordSalt;
           CreatePasswordHash(password,out passwordHash,out passwordSalt);
           user.PasswordHash=passwordHash;
           user.PasswordSalt=passwordSalt;
         await  _context.AddAsync(user);
         await _context.SaveChangesAsync();
         return user
         ;
        }

        public async Task<bool> UserExist(string username)
        {
           if( await _context.Users.AnyAsync(a=>a.Username==username))
           return true;

           return false;
        }
        private void CreatePasswordHash(string password,out byte[] passwordHash,out byte[] passwordSalt)
        {
            using (var hmac= new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            } 
        }
    }
}