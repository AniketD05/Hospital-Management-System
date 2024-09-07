namespace HospitalManagementSystemBackend.Models
{
   public class LoginDTO
    {
        public string userid { get; set; }
        public string pwd { get; set; }

        public override string ToString()
        {
            return $"LoginDTO [UserId={userid}, Pwd={pwd}]";
        }
    }
}
