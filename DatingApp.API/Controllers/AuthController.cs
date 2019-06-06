using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Models;
using DatingApp.API.Dto;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthReposatry _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthReposatry repo,IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
           _mapper = mapper;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)

        {
           userForRegisterDto.username=userForRegisterDto.username.ToLower();
            if (await _repo.UserExist(userForRegisterDto.username))
            return BadRequest("User Name Is Exists");
            var userToCreate= new 
            User{
                Username=userForRegisterDto.username
            };
            var createdUser=await _repo.Register(userToCreate,userForRegisterDto.password);
            return StatusCode(201);
        }
[HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userforlogin)
        {
var userFromRepo=await _repo.Login(userforlogin.username.ToLower(),userforlogin.password);
if(userFromRepo==null)
return Unauthorized();
var claims= new[]
{
    new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
    new Claim(ClaimTypes.Name,userFromRepo.Username)
};
string keystr=_config.GetSection("AppSettings:Token").Value;
var key = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
var cred=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
var tokenDescriptor= new SecurityTokenDescriptor
{
    Subject= new ClaimsIdentity(claims),
    Expires= DateTime.Now.AddDays(1),
    SigningCredentials=cred
};
var tokenHandelar= new JwtSecurityTokenHandler();
var token=tokenHandelar.CreateToken(tokenDescriptor);
var user=_mapper.Map<UserForDetailsDto>(userFromRepo);
return Ok(new {

    token= tokenHandelar.WriteToken(token),
    user= user
});
        }
    }
}