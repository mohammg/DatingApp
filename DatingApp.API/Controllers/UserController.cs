using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DatingApp.API.Controllers
{
    [Authorize]
     [Route("api/[controller]")]
    [ApiController]
    public class UsersController:ControllerBase
    {
        private readonly IDatingReposatry repo;
        private readonly IMapper mapper;

        public UsersController(IDatingReposatry repo,IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users=await repo.GetUsers();
            var usersToReturn=mapper.Map<IEnumerable< UserForListDto>>(users);
                      return Ok(usersToReturn);
           // return Ok(users);
        }
          [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await repo.GetUser(id);
            var userToReturn=mapper.Map<UserForDetailsDto>(user);
                      return Ok(userToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRebo=await repo.GetUser(id);
            mapper.Map(userForUpdateDto,userFromRebo);
            if( await repo.SaveAll())
            return NoContent();
            throw new Exception($"Updating user {id} failed on save");

        }
    }
}