using EduQuestHub.Server.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace EduQuestHub.Server.Helper
{
    public class SeedData
    {
        public static async void Initialize(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;

                try
                {
                    var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                    await SeedRoles(roleManager);
                    await SeedUsers(userManager);
                }
                catch (Exception ex)
                {
                    // Log the error
                }
            }
        }

        private static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            string[] roleNames = { "Admin", "Customer" };

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);

                if (!roleExist)
                {
                    // Create the roles and seed them to the database
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }

        private static async Task SeedUsers(UserManager<ApplicationUser> userManager)
        {
            // You can add your logic to create and seed users here if needed
            // For example:
            var adminUser = new ApplicationUser
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                FullName = "admin",
                PhoneNumber = "9999999999",
                // Add other properties as needed
            };

            var result = await userManager.CreateAsync(adminUser, "AdminPassword123");

            if (result.Succeeded)
            {
                // Assign the admin user to the "Admin" role
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }
}
