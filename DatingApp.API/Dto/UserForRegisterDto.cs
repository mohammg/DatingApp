using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dto
{
    public class UserForRegisterDto
    {
        [Required]
        public string   username { get; set; }
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="Length Must be between 4 and 8 char")]
        public string password { get; set; }
    }
}