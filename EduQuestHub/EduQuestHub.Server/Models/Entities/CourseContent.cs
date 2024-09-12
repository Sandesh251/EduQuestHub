namespace EduQuestHub.Server.Models.Entities
{
    public class CourseContent
    {
        public int CourseContentId { get; set; }
        public int CourseId { get; set; }
        public string Type { get; set; } // Video, Link, PDF, etc.
        public string Content { get; set; } // URL or File Path
    }
}
