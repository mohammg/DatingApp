using AutoMapper;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using DatingApp.API.Helper;
using CloudinaryDotNet;
using DatingApp.API.Dto;
using System.Threading.Tasks;
using System.Security.Claims;
using CloudinaryDotNet.Actions;
using DatingApp.API.Models;
using System.Linq;

namespace DatingApp.API.Controllers
{
    [Authorize]
     [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotoController:ControllerBase
    {
        private readonly IDatingReposatry repo;
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySetting> cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotoController(IDatingReposatry repo,IMapper mapper,
        IOptions<CloudinarySetting> cloudinaryConfig)
        {
            this.repo = repo;
            this.mapper = mapper;
            this.cloudinaryConfig = cloudinaryConfig;
            Account acc= new Account(
                cloudinaryConfig.Value.cloudName,
                cloudinaryConfig.Value.ApiKey,
                cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary= new Cloudinary(acc);
        }
[HttpGet("{id}",Name="GetPhoto")]
public async Task<IActionResult> GetPhoto(int id)
{
    var photoFromRepo=await repo.GetPhoto(id);
    var photo=mapper.Map<PhotoforReturnDto>(photoFromRepo);
    return Ok(photo);
}

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,
        [FromForm]PhotoforCreateDto photoforCreateDto)
        {
            if (userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                 return Unauthorized();
            var userFromRepo= await repo.GetUser(userId);
            var file=photoforCreateDto.File;
            var uploadResult= new ImageUploadResult();
            if (file.Length>0)
            {
                using (var stream=file.OpenReadStream())
                {
                    var uploadParams= new ImageUploadParams(){
                         File=new FileDescription(file.Name,stream)
                         ,Transformation=new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult= _cloudinary.Upload(uploadParams);
                }
            }
            photoforCreateDto.Url=uploadResult.Uri.ToString();
            photoforCreateDto.PublicId=uploadResult.PublicId;
            var photo=mapper.Map<Photo>(photoforCreateDto);
            photo.PuplicId=uploadResult.PublicId;
            if (!userFromRepo.Photos.Any(u=> u.IsMain))
                 photo.IsMain=true;
            userFromRepo.Photos.Add(photo);
            if (await repo.SaveAll())
            {
                var photoToreturn=mapper.Map<PhotoforReturnDto>(photo);
                return CreatedAtRoute("GetPhoto",new { id =photo.Id },photoToreturn);
            }
            return BadRequest("Could not add the photo");
            

        }
  [HttpPost("{id}/setMain")]
  public async Task<IActionResult> SetMainPhoto(int userId,int id)
  {
        if (userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                 return Unauthorized();
            var user= await repo.GetUser(userId);
            if(!user.Photos.Any(p=>p.Id==id))
            return Unauthorized();
            var photoFromRepo=await repo.GetPhoto(id);
            if(photoFromRepo.IsMain)
            BadRequest("this photo as already the main photo");
            var currentMainPhoto= await repo.GetMainPhotoForUser(userId);
            currentMainPhoto.IsMain=false;
            photoFromRepo.IsMain=true;
            if(await repo.SaveAll())
            return NoContent();

            return BadRequest("could not set Main Photo");
  }
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeletePhoto(int userId,int id)
  {
       if (userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                 return Unauthorized();
            var user= await repo.GetUser(userId);
            if(!user.Photos.Any(p=>p.Id==id))
                return Unauthorized();
            var photoFromRepo=await repo.GetPhoto(id);
            if(photoFromRepo.IsMain)
                 BadRequest("this photo is the main photo");
                 if (photoFromRepo.PuplicId != null)
                 {
                       var deleteParams= new DeletionParams(photoFromRepo.PuplicId);
            var result=_cloudinary.Destroy(deleteParams);
            if (result.Result=="ok")
            {
                repo.Delete(photoFromRepo);
            }
                 }
                  if (photoFromRepo.PuplicId == null)
                 {
  repo.Delete(photoFromRepo);
                 }
          
            if (await repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Failed Delete Photo");

  }
    }
}