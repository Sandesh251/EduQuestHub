namespace EduQuestHub.Server.Models.Entities
{
    public class Course
    {
        public int CourseId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<CourseContent> Contents { get; set; }

        public List<Feedback> Feedbacks { get; set; }
    }
}
