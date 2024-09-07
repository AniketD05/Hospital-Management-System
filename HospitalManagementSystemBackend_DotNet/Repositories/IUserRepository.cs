using HospitalManagementSystemBackend.Entities;
using HospitalManagementSystemBackend.Models;

namespace HospitalManagementSystemBackend.Repositories
{
    public interface IUserRepository
    {
        Task<User> ValidateUserAsync(LoginDTO dto);
        Task CreateUserAsync(User user); // New method to create a user

        Task DeleteUserAsync(string uid, string role);

    }
}
