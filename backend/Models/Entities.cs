using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlmasryNews.Api.Models
{
    [Table("Articles")]
    public class Article
    {
        [Key]
        [MaxLength(100)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(255)]
        public string Slug { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Subtitle { get; set; }

        [MaxLength(1000)]
        public string? Excerpt { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string FeaturedImage { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? ImageCaption { get; set; }

        [Required]
        [MaxLength(100)]
        public string CategoryId { get; set; } = string.Empty;
        public Category? Category { get; set; }

        [MaxLength(150)]
        public string? CategoryName { get; set; }

        [Required]
        [MaxLength(100)]
        public string AuthorId { get; set; } = string.Empty;
        public Author? Author { get; set; }

        [MaxLength(150)]
        public string? AuthorName { get; set; }

        [MaxLength(100)]
        public string? Governorate { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "published";

        public bool IsBreaking { get; set; } = false;
        public bool IsFeatured { get; set; } = false;
        public bool IsTrending { get; set; } = false;
        public bool IsFactCheck { get; set; } = false;

        [MaxLength(50)]
        public string? FactVerdict { get; set; }

        public string? VideoUrl { get; set; }
        public string? VideoType { get; set; }

        public int Views { get; set; } = 0;
        public int LikesCount { get; set; } = 0;
        public int CommentsCount { get; set; } = 0;
        public int SharesCount { get; set; } = 0;

        public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    [Table("Categories")]
    public class Category
    {
        [Key]
        [MaxLength(100)]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Slug { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(150)]
        public string? NameEn { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        [MaxLength(50)]
        public string? IconName { get; set; }

        [MaxLength(20)]
        public string? Color { get; set; }

        public int DisplayOrder { get; set; } = 0;
        public bool IsActive { get; set; } = true;
    }

    [Table("Authors")]
    public class Author
    {
        [Key]
        [MaxLength(100)]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Slug { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Role { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Bio { get; set; }

        [MaxLength(256)]
        public string? Email { get; set; }

        public string? Avatar { get; set; }
        public int ArticlesCount { get; set; } = 0;
    }

    [Table("Users")]
    public class User
    {
        [Key]
        [MaxLength(100)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(256)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(256)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Role { get; set; } = "editor";

        [MaxLength(100)]
        public string? RoleTitle { get; set; }

        [MaxLength(100)]
        public string? Department { get; set; }

        public string? Avatar { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    [Table("BreakingNews")]
    public class BreakingNewsItem
    {
        [Key]
        [MaxLength(100)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(500)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? ArticleId { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [MaxLength(50)]
        public string Urgency { get; set; } = "high";
        public bool IsActive { get; set; } = true;
    }

    [Table("LiveUpdates")]
    public class LiveUpdate
    {
        [Key]
        [MaxLength(100)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(255)]
        public string EventTitle { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public bool IsPinned { get; set; } = false;
    }

    [Table("Comments")]
    public class Comment
    {
        [Key]
        [MaxLength(100)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(100)]
        public string ArticleId { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [MaxLength(50)]
        public string Status { get; set; } = "approved";
        public int Likes { get; set; } = 0;
    }
}
