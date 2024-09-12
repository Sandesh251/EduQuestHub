using Microsoft.AspNetCore.Identity;

namespace EduQuestHub.Server.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }

        
    }
}
