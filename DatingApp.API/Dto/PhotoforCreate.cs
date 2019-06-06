using Microsoft.AspNetCore.Http;
using System;
namespace DatingApp.API.Dto
{
    public class PhotoforCreateDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId  { get; set; }
        public PhotoforCreateDto()
        {
            DateAdded= DateTime.Now;
        }
    }
}