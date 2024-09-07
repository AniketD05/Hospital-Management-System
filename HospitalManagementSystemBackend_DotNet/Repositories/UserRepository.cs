using HospitalManagementSystemBackend.Entities;
using HospitalManagementSystemBackend.Models;
using MongoDB.Driver;

namespace HospitalManagementSystemBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(IMongoClient client)
        {
            var database = client.GetDatabase("HMS_DB");
            _users = database.GetCollection<User>("Users");
        }

        public async Task<User> ValidateUserAsync(LoginDTO dto)
        {
            return await _users.Find(user => user.Userid == dto.userid && user.Password == dto.pwd).FirstOrDefaultAsync();
        }

        public async Task CreateUserAsync(User user)
        {
            await _users.InsertOneAsync(user);
        }

         // Method to delete a user based on UID and Role
        public async Task DeleteUserAsync(string uid, string role)
        {
            var filter = Builders<User>.Filter.And(
                Builders<User>.Filter.Eq(user => user.Uid, uid),
                Builders<User>.Filter.Eq(user => user.Role, role)
            );

            await _users.DeleteOneAsync(filter);
        }

    }
}
