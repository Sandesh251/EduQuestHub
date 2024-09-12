namespace EduQuestHub.Server.DTO
{
    public class ContentUploadDto
    {
        public IFormFileCollection Files { get; set; }
        public string Type { get; set; }
    }
}
