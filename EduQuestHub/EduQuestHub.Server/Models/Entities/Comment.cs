namespace EduQuestHub.Server.Models.Entities
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public string UserId { get; set; } // ApplicationUser Id
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public ApplicationUser User { get; set; }
        public Post Post { get; set; }
    }
}
