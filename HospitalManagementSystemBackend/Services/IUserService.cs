using HospitalManagementSystemBackend.Entities;
using HospitalManagementSystemBackend.Models;

namespace HospitalManagementSystemBackend.Services
{
    public interface IUserService
    {
        Task<User> ValidateAsync(LoginDTO dto);
        Task RegisterAsync(User user);

        Task DeleteUser(string uid, string role);
       
    }
}
