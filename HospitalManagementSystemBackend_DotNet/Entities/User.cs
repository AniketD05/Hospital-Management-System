using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace HospitalManagementSystemBackend.Entities
{
 public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Uid { get; set; } // MongoDB typically uses ObjectId as the primary key, but you can adjust this according to your needs

        [BsonElement("userid")]
        public string Userid { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }

        [BsonElement("role")]
        public string Role { get; set; }

        [BsonElement("uname")]
        public string Uname { get; set; }

        public override string ToString()
        {
            return $"User [userid={Userid}, password={Password}, role={Role}, uname={Uname}]";
        }
    }
}
