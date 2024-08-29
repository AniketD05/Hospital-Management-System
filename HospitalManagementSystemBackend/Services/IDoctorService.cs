using Hospital.Entities;


namespace Hospital.Services
{
    public interface IDoctorService
    {
        Task<string> SaveDoctor(Doctor doc);
        Task<List<Doctor>> GetAllDocs();
        Task<long> CountDocs();
        Task<Doctor> FindById(string id);
        Task<bool> UpdateDoctor(string id, Doctor updatedDoc);
        Task<bool> DeleteDoctor(string id);
        string GenerateId();
    }
}
