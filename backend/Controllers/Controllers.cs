using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AlmasryNews.Api.Data;
using AlmasryNews.Api.Models;

namespace AlmasryNews.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ArticlesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles(
            [FromQuery] string? category,
            [FromQuery] bool? breaking,
            [FromQuery] bool? featured,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var query = _context.Articles.AsNoTracking().AsQueryable();

            if (!string.IsNullOrEmpty(category) && category != "all")
                query = query.Where(a => a.CategoryId == category || a.Category!.Slug == category);

            if (breaking.HasValue)
                query = query.Where(a => a.IsBreaking == breaking.Value);

            if (featured.HasValue)
                query = query.Where(a => a.IsFeatured == featured.Value);

            var total = await query.CountAsync();
            var articles = await query
                .OrderByDescending(a => a.PublishedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new { total, page, pageSize, data = articles });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(string id)
        {
            var article = await _context.Articles
                .Include(a => a.Category)
                .Include(a => a.Author)
                .FirstOrDefaultAsync(a => a.Id == id || a.Slug == id);

            if (article == null) return NotFound(new { message = "المقال غير موجود" });

            article.Views++;
            await _context.SaveChangesAsync();

            return Ok(article);
        }

        [HttpPost]
        public async Task<ActionResult<Article>> CreateArticle([FromBody] Article article)
        {
            if (string.IsNullOrEmpty(article.Id))
                article.Id = $"art-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";

            article.PublishedAt = DateTime.UtcNow;
            article.UpdatedAt = DateTime.UtcNow;

            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArticle(string id, [FromBody] Article article)
        {
            if (id != article.Id) return BadRequest();

            article.UpdatedAt = DateTime.UtcNow;
            _context.Entry(article).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Articles.AnyAsync(e => e.Id == id))
                    return NotFound();
                throw;
            }

            return Ok(article);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(string id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null) return NotFound();

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories
                .Where(c => c.IsActive)
                .OrderBy(c => c.DisplayOrder)
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.IsActive);

            if (user == null || user.PasswordHash != request.Password)
            {
                return Unauthorized(new { message = "بيانات الدخول غير صحيحة" });
            }

            return Ok(new
            {
                token = $"jwt_mock_token_{Guid.NewGuid()}",
                user = new
                {
                    user.Id,
                    user.Email,
                    user.Name,
                    user.Role,
                    user.RoleTitle,
                    user.Department,
                    user.Avatar
                }
            });
        }
    }

    public record LoginRequest(string Email, string Password);
}
