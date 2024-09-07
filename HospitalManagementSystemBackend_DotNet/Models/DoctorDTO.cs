using Hospital.Entities;

namespace Hospital.Models
{
    public class DoctorDTO : Doctor
    {
        public string Userid { get; set; }
        public string Pwd { get; set; }
    }
}
