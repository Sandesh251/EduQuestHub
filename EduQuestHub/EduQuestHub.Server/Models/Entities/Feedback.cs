namespace EduQuestHub.Server.Models.Entities
{
    public class Feedback
    {
        public int FeedbackId { get; set; }
        public int CourseId { get; set; }
        public string UserId { get; set; } // ApplicationUser Id
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ApplicationUser User { get; set; }
        public Course Course { get; set; }
    }
}
