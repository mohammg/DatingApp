using System;

namespace DatingApp.API.Dto
{
    public class PhotoforReturnDto
    {
          public int Id { get; set; }
        public string Url { get; set; }
        public string Descrption { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; } 
        public string PuplicId { get; set; }
    }
}