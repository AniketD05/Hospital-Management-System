using HospitalManagementSystemBackend.Models;
using HospitalManagementSystemBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementSystemBackend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateUser([FromBody] LoginDTO dto)
        {
            try
            {
                var user = await _userService.ValidateAsync(dto);
                if (user == null)
                {
                    return Unauthorized();
                }
                return Ok(user);
            }
            catch
            {
                return Unauthorized();
            }
        }
    }
}
