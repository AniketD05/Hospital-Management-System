using MongoDB.Driver;
using Hospital.Entities;

namespace Hospital.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly IMongoCollection<Doctor> _doctorCollection;

        public DoctorRepository(IMongoClient client)
        {
            var database = client.GetDatabase("HMS_DB");
            _doctorCollection = database.GetCollection<Doctor>("Doctors");
        }

        public async Task<Doctor> GetByIdAsync(string id)
        {
            return await _doctorCollection.Find(doc => doc.Id == id && doc.IsActive).FirstOrDefaultAsync();
        }

        public async Task<List<Doctor>> GetAllAsync()
        {
            return await _doctorCollection.Find(doc => doc.IsActive).ToListAsync();
        }

        public async Task<Doctor> AddAsync(Doctor doctor)
        {
            await _doctorCollection.InsertOneAsync(doctor);
            return doctor;
        }

        public async Task<bool> UpdateAsync(string id, Doctor doctor)
        {
            var result = await _doctorCollection.ReplaceOneAsync(doc => doc.Id == id && doc.IsActive, doctor);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var doctor = await GetByIdAsync(id);
            if (doctor != null)
            {
                doctor.IsActive = false; // Soft delete
                await UpdateAsync(id, doctor);
                return true;
            }
            return false;
        }

        public async Task<long> CountAsync()
        {
            return await _doctorCollection.CountDocumentsAsync(doc => doc.IsActive);
        }


    }
}
