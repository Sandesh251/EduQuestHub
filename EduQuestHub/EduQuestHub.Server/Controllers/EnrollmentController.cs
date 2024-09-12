using EduQuestHub.Server.Models;
using EduQuestHub.Server.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduQuestHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentController : Controller
    {
        private readonly AppDbContext _appDbContext;

        public EnrollmentController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost("enroll/{userId}/{courseId}")]
        public async Task<IActionResult> EnrollUserToCourse(string userId, int courseId)
        {
            var user = await _appDbContext.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var course = await _appDbContext.Courses.FindAsync(courseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            // Check if the user is already enrolled in the course
            var existingEnrollment = await _appDbContext.Enrollments.FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId);
            if (existingEnrollment != null)
            {
                return BadRequest(new {Message = "You are already enrolled in this course, Please go to My Courses"});
            }

            var enrollment = new Enrollment
            {
                UserId = userId,
                CourseId = courseId
            };

            _appDbContext.Enrollments.Add(enrollment);
            await _appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("unenroll/{userId}/{courseId}")]
        public async Task<IActionResult> UnenrollUserFromCourse(string userId, int courseId)
        {
            var enrollment = await _appDbContext.Enrollments.FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId);
            if (enrollment == null)
            {
                return NotFound("User is not enrolled in the course.");
            }

            _appDbContext.Enrollments.Remove(enrollment);
            await _appDbContext.SaveChangesAsync();

            return Ok("User unenrolled successfully.");
        }

        [HttpGet("mycourses/{userId}")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCoursesForUser(string userId)
        {
            // Retrieve the enrollments for the specified user
            var enrollments = await _appDbContext.Enrollments
                .Where(e => e.UserId == userId)
                .ToListAsync();

            if (enrollments == null || enrollments.Count == 0)
            {
                // If the user is not enrolled in any courses, return an empty list
                return Ok(new List<Course>());
            }

            // Retrieve the course IDs for the user's enrollments
            var courseIds = enrollments.Select(e => e.CourseId).ToList();

            // Retrieve the courses based on the course IDs
            var courses = await _appDbContext.Courses
                .Where(c => courseIds.Contains(c.CourseId))
                .ToListAsync();

            return Ok(courses);
        }
    }
}
