using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace Hospital.Entities
{
    public class Doctor
    {   
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("age")]
        public int Age { get; set; }

        [BsonElement("gender")]
        public string Gender { get; set; }

        [BsonElement("phone")]
        public string Phone { get; set; }

        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("qualification")]
        public string Qualification { get; set; }

        [BsonElement("speciality")]
        public string Speciality { get; set; }

        [BsonElement("isactive")]
        public bool IsActive { get; set; } = true;

        [BsonElement("createdon")]
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}
