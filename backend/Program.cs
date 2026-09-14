using Microsoft.EntityFrameworkCore;
using AlmasryNews.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database Context (SQL Server by default, with InMemory fallback if package or connection is set)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (!string.IsNullOrWhiteSpace(connectionString) && !connectionString.Contains("YOUR_HOST"))
    {
        options.UseSqlServer(connectionString);
    }
    else
    {
        // Requires Microsoft.EntityFrameworkCore.InMemory package
        options.UseInMemoryDatabase("AlmasryNewsDb");
    }
});

// CORS for Angular 18 Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure Swagger to open directly at the root URL (or /swagger)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "بوابة المصري الإخباري API v1");
    c.RoutePrefix = string.Empty; // Makes Swagger the default homepage at http://localhost:PORT/
});

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();
app.MapControllers();

// Welcome / health check info endpoint
app.MapGet("/api/status", () => Results.Ok(new
{
    status = "running",
    name = "بوابة المصري الإخباري - ASP.NET Core 8 Web API",
    swaggerUrl = "/",
    timestamp = DateTime.UtcNow
}));

app.Run();
