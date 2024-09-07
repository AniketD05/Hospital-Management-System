using Hospital.Repositories;
using Hospital.Services;
using HospitalManagementSystemBackend.Entities;
using HospitalManagementSystemBackend.Models;
using HospitalManagementSystemBackend.Repositories;
using HospitalManagementSystemBackend.Services;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddSingleton<IMongoClient, MongoClient>(sp =>
{
    var settings = builder.Configuration.GetConnectionString("MongoDb");
    return new MongoClient(settings);
});

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IDoctorRepository, DoctorRepository>();
builder.Services.AddScoped<IDoctorService, DoctorService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAll");

await InitializeAdminUser(app.Services);

app.MapControllers();

app.Run();


async Task InitializeAdminUser(IServiceProvider services)
{
    using var scope = services.CreateScope();
    var userService = scope.ServiceProvider.GetRequiredService<IUserService>();

    // Create an admin user if it doesn't already exist
    var adminUser = new User
    {
        Userid = "admin",
        Password = "admin", // Make sure to hash this in a real application
        Role = "Admin",
        Uname = "Adminstrator"
    };

    var existingUser = await userService.ValidateAsync(new LoginDTO { userid = adminUser.Userid, pwd = adminUser.Password });
    if (existingUser == null)
    {
        await userService.RegisterAsync(adminUser);
        Console.WriteLine("Admin user created successfully");
    }
    else
    {
        Console.WriteLine("Admin user already exists");
    }
}
