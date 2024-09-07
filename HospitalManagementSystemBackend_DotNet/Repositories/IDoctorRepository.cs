using Hospital.Entities;

namespace Hospital.Repositories
{
    public interface IDoctorRepository
    {
        Task<Doctor> GetByIdAsync(string id);
        Task<List<Doctor>> GetAllAsync();
        Task<Doctor> AddAsync(Doctor doctor);
        Task<bool> UpdateAsync(string id, Doctor doctor);
        Task<bool> DeleteAsync(string id);
        Task<long> CountAsync();
    }
}
