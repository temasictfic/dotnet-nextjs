using AuthAPI.Data;
using AuthAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("profile")]
        public async Task<ActionResult<User>> GetProfile()
        {
            var username = User.FindFirst("username")?.Value;
            
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized(new { message = "Kullanıcı doğrulanamadı" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı" });
            }

            // Hassas verileri döndürmeden önce temizle
            user.PasswordHash = string.Empty;
            
            return Ok(user);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllUsers()
        {
            var users = await _context.Users.Select(u => new
            {
                u.Id,
                u.Username,
                u.Email,
                u.FirstName,
                u.LastName,
                u.Role,
                u.CreatedAt
            }).ToListAsync();
            
            return Ok(users);
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(User updatedUser)
        {
            var username = User.FindFirst("username")?.Value;
            
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized(new { message = "Kullanıcı doğrulanamadı" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı" });
            }

            // Sadece belirli alanların güncellenmesine izin ver
            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.Email = updatedUser.Email;
            
            await _context.SaveChangesAsync();
            
            return Ok(new { message = "Profil başarıyla güncellendi" });
        }
    }
}
