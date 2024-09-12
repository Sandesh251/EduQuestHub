namespace EduQuestHub.Server.Models.Entities
{
    public class Enrollment
    {
        public int EnrollmentId { get; set; }
        public string UserId { get; set; } // ApplicationUser Id
        public int CourseId { get; set; }
        public ApplicationUser User { get; set; }
        public Course Course { get; set; }
    }
}
