using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    }
}