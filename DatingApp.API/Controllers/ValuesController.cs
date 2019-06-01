using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{[Authorize]
    [Route("api/[controller]")]
    [ApiController]
   // 
    public class ValuesController : ControllerBase
    {
        Data.DataDbContext _db;
        public ValuesController(Data.DataDbContext db)
        {
            _db=db;
        }
        // GET api/values
        [HttpGet]
        public async Task< IActionResult> GetValues()
        {   var result=await  _db.Values.ToListAsync();
            return Ok(result);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task< IActionResult> GetValue(int id)
        {
       var result= await    _db.Values.FirstOrDefaultAsync(a=>a.Id==id);
            return Ok(result) ;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
