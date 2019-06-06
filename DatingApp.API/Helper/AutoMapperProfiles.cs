using System.Linq;
using AutoMapper;
using DatingApp.API.Dto;
using DatingApp.API.Models;

namespace DatingApp.API.Helper
{
    public class AutoMapperProfiles:Profile
    {
       public AutoMapperProfiles()
       {
           CreateMap<User,UserForListDto>()
           .ForMember(dest=> dest.PhotoUrl,opt =>{
               opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);
           }).ForMember(dest=>dest.Age,opt=>{
               opt.ResolveUsing(src=>src.DateOfBirth.CalculateAge());
           });
           CreateMap<User,UserForDetailsDto>() .ForMember(dest=> dest.PhotoUrl,opt =>{
               opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);
           }).ForMember(dest=>dest.Age,opt=>{
               opt.ResolveUsing(src=>src.DateOfBirth.CalculateAge());
           });

       CreateMap<Photo,PhotoForDetailsDto>();
       CreateMap<UserForUpdateDto,User>();
         CreateMap<PhotoforCreateDto,Photo>();
         CreateMap<Photo,PhotoforReturnDto>();
       } 
    }
}