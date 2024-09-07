using MongoDB.Driver;
using Hospital.Entities;

using HospitalManagementSystemBackend.Services;
using Hospital.Repositories;

namespace Hospital.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IMongoCollection<Doctor> _doctorCollection;
        private readonly IUserService _uservice;

        private readonly IDoctorRepository _doctorRepository;


        public DoctorService(IMongoClient client, IUserService uservice, IDoctorRepository doctorRepository)
        {
            var database = client.GetDatabase("HMS_DB");
            _doctorCollection = database.GetCollection<Doctor>("Doctors");
            _uservice = uservice;
            _doctorRepository = doctorRepository;
        }

        public async Task<string> SaveDoctor(Doctor doc)
        {
            await _doctorCollection.InsertOneAsync(doc);
            return doc.Id.ToString();
        }

        public async Task<List<Doctor>> GetAllDocs()
        {
            return await _doctorCollection.Find(doc => doc.IsActive).ToListAsync();
        }
        public long CountDocs()
        {
            return _doctorCollection.CountDocuments(doc => doc.IsActive);
        }


        public async Task<Doctor> FindById(string id)
        {
            return await _doctorCollection.Find(doc => doc.Id == id && doc.IsActive).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateDoctor(string id, Doctor updatedDoc)
        {
            var result = await _doctorCollection.ReplaceOneAsync(doc => doc.Id == id && doc.IsActive, updatedDoc);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteDoctor(string id)
        {
            var doctor = await FindById(id);
            if (doctor == null)
            {
                return false;
            }
            doctor.IsActive = false;
            await _doctorCollection.ReplaceOneAsync(doc => doc.Id == id, doctor);
            await _uservice.DeleteUser(id, "Doctor");
            return true;
        }

        public string GenerateId()
        {
            return "doctor" + (CountDocs() + 1);
        }

        Task<long> IDoctorService.CountDocs()
        {
            throw new NotImplementedException();
        }
    }
}
