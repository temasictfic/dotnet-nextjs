using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        [HttpGet("stats")]
        public IActionResult GetStats()
        {
            // Örnek dashboard istatistikleri
            var stats = new
            {
                TotalUsers = 156,
                ActiveUsers = 87,
                NewUsers = 12,
                TotalSales = 24500,
                Metrics = new[]
                {
                    new { Month = "Ocak", Value = 1200 },
                    new { Month = "Şubat", Value = 1900 },
                    new { Month = "Mart", Value = 2300 },
                    new { Month = "Nisan", Value = 2100 },
                    new { Month = "Mayıs", Value = 2800 },
                    new { Month = "Haziran", Value = 3200 }
                },
                RecentActivities = new[]
                {
                    new { User = "ahmet123", Action = "Profil güncellendi", Date = DateTime.Now.AddHours(-2) },
                    new { User = "mehmet456", Action = "Yeni kayıt", Date = DateTime.Now.AddHours(-5) },
                    new { User = "ayse789", Action = "Giriş yapıldı", Date = DateTime.Now.AddHours(-12) },
                    new { User = "fatma234", Action = "Çıkış yapıldı", Date = DateTime.Now.AddDays(-1) }
                }
            };

            return Ok(stats);
        }

        [HttpGet("reports")]
        public IActionResult GetReports()
        {
            // Örnek rapor verileri
            var reports = new[]
            {
                new { Id = 1, Title = "Aylık Kullanıcı Raporu", Date = DateTime.Now.AddDays(-5), Type = "PDF" },
                new { Id = 2, Title = "Gelir Raporu", Date = DateTime.Now.AddDays(-10), Type = "Excel" },
                new { Id = 3, Title = "Aktivite Özeti", Date = DateTime.Now.AddDays(-15), Type = "PDF" },
            };

            return Ok(reports);
        }
    }
}
