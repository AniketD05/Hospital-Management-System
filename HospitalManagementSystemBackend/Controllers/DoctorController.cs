using Microsoft.AspNetCore.Mvc;

using Hospital.Entities;
using Hospital.Models;
using Hospital.Services;
using Microsoft.AspNetCore.Cors;
using HospitalManagementSystemBackend.Services;
using HospitalManagementSystemBackend.Entities;

namespace Hospital.Controllers
{
    [ApiController]
    [Route("api/doctors")]
    [EnableCors("AllowAll")]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _dservice;
        private readonly IUserService _uservice;

        public DoctorController(IDoctorService dservice, IUserService uservice)
        {
        
            _dservice = dservice;
            _uservice = uservice;
        }

        [HttpGet]
        public async Task<IActionResult> FindAllDoctors()
        {
            List<Doctor> result = await _dservice.GetAllDocs();
            return Ok(result);
        }
      
        [HttpGet("generateid")]
        public IActionResult GenerateDoctorId()
        {
            string id = _dservice.GenerateId();
            return Ok(id);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> FindDoctorDetails(string id)
        {
            var result = await _dservice.FindById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctorDetails(string id, [FromBody] Doctor doctor)
        {
            var updated = await _dservice.UpdateDoctor(id, doctor);
            if (!updated)
            {
                return NotFound();
            }
            return Ok("Updated successfully");
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] DoctorDTO dto)
        {
            // Manually create and populate the Doctor object
            var doctor = new Doctor
            {
                Name = dto.Name,
                Age = dto.Age,
                Gender = dto.Gender,
                Phone = dto.Phone,
                Address = dto.Address,
                Qualification = dto.Qualification,
                Speciality = dto.Speciality,
                IsActive = true,
                CreatedOn = DateTime.Now
            };

            // Save the doctor and get the generated ID
            string id = await _dservice.SaveDoctor(doctor);
            doctor.Id = id;

            // Create and populate the User object
            var user = new User
            {
                Uname = dto.Name,
                Password = dto.Pwd,
                Role = "Doctor",
                Uid = id,
                Userid = dto.Userid
            };

            // Register the user
            await _uservice.RegisterAsync(user);

            // Create the response object with data array
            var response = new
            {
                data = new List<object>
        {
            new
            {
                id = doctor.Id,
                name = doctor.Name,
                age = doctor.Age,
                gender = doctor.Gender,
                phone = doctor.Phone,
                address = doctor.Address,
                qualification = doctor.Qualification,
                speciality = doctor.Speciality,
                isActive = doctor.IsActive,
                createdOn = doctor.CreatedOn
            }
        },
                status = "success"
            };

            // Return the response as JSON
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            bool deleted = await _dservice.DeleteDoctor(id);
            if (!deleted)
            {
                return NotFound();
            }
            return Ok("Doctor removed successfully");
        }
    }
}
