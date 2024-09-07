using HospitalManagementSystemBackend.Entities;
using HospitalManagementSystemBackend.Models;
using HospitalManagementSystemBackend.Repositories;

namespace HospitalManagementSystemBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> ValidateAsync(LoginDTO dto)
        {
            return await _userRepository.ValidateUserAsync(dto);
        }
        public async Task RegisterAsync(User user)
        {
            await _userRepository.CreateUserAsync(user);
        }

        public async Task DeleteUser(string uid, string role)
        {
            await _userRepository.DeleteUserAsync(uid, role);
        }
    }
}
