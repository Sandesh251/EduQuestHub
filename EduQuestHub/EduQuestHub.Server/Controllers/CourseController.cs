using EduQuestHub.Server.DTO;
using EduQuestHub.Server.Models;
using EduQuestHub.Server.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduQuestHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {

        private readonly AppDbContext _appDbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public CourseController(AppDbContext appDbContext, IWebHostEnvironment hostingEnvironment)
        {
            _appDbContext = appDbContext;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourse([FromBody] Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _appDbContext.Courses.Add(course);
            await _appDbContext.SaveChangesAsync();

            return Ok(course);
        }


        [HttpPost("{courseId}")]
        public async Task<IActionResult> UploadContent(int courseId, [FromForm] string type, [FromForm] List<IFormFile> files)
        {
            var course = await _appDbContext.Courses.FindAsync(courseId);
            if (course == null)
            {
                return NotFound();
            }

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "uploads", courseId.ToString());
                    var fileName = Path.GetFileName(file.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    // Ensure the directory exists
                    Directory.CreateDirectory(uploadsFolder);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var content = new CourseContent
                    {
                        CourseId = courseId,
                        Type = type,
                        Content = Path.Combine(courseId.ToString(), fileName) // Store relative file path
                    };

                    _appDbContext.CourseContents.Add(content);
                }
            }

            await _appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetCourses()
        {
            var courses = await _appDbContext.Courses.ToListAsync();
            return Ok(courses);
        }

        [HttpGet("courses/{courseId}")]

        public async Task<IActionResult> GetSpecificCourse(int courseId)
        {
            var course = await _appDbContext.Courses.FindAsync(courseId);
            if(course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }

        [HttpPut("course/{courseId}")]

        public async Task<IActionResult> GetSpecificCourse(int courseId, Course updatedCourse)
        {
            var course = await _appDbContext.Courses.FindAsync(courseId);

            if(course == null)
            {
                return NotFound();
            }

            course.Title = updatedCourse.Title;
            course.Description = updatedCourse.Description;

            _appDbContext.Courses.Update(course);
            await _appDbContext.SaveChangesAsync();

            return Ok();

        }

        [HttpDelete("course/{courseId}")]
        public async Task<IActionResult> DeleteCourse(int courseId)
        {
            var course = await _appDbContext.Courses.FindAsync(courseId);
            if (course == null)
            {
                return NotFound();
            }

            _appDbContext.Courses.Remove(course);
            await _appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("course/{id}/content")]
        public async Task<ActionResult<IEnumerable<CourseContent>>> GetCourseContent(int id)
        {
            var contents = await _appDbContext.CourseContents.Where(c => c.CourseId == id).ToListAsync();
            return contents;
        }

        [HttpGet("course/{id}/content/{contentId}")]
        public async Task<IActionResult> GetCourseContentById(int id, int contentId)
        {
            var content = await _appDbContext.CourseContents.FirstOrDefaultAsync(c => c.CourseId == id && c.CourseContentId == contentId);

            if (content == null)
            {
                return NotFound();
            }

            var filePath = Path.Combine(_hostingEnvironment.ContentRootPath, "uploads", content.Content);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            // Set content type based on file type
            var contentType = GetContentType(content.Type);

            // Serve PDF as file attachment
            if (content.Type == "PDF")
            {
                return PhysicalFile(filePath, contentType, content.Content);
            }
            // Serve video as stream
            else if (content.Type == "Video")
            {
                var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                return File(stream, contentType);
            }
            else
            {
                // Handle other types or return error
                return BadRequest("Unsupported content type.");
            }
        }

        // Helper method to get content type based on file type
        private string GetContentType(string fileType)
        {
            if (fileType == "PDF")
            {
                return "application/pdf";
            }
            else if (fileType == "Video")
            {
                return "video/mp4"; // Adjust based on video format
            }
            else
            {
                return "application/octet-stream"; // Default content type
            }
        }
        [HttpDelete("course/{id}/content/{contentId}")]
        public async Task<IActionResult> DeleteCourseContent(int id, int contentId)
        {
            var content = await _appDbContext.CourseContents.FirstOrDefaultAsync(c => c.CourseId == id && c.CourseContentId == contentId);
            if (content == null)
            {
                return NotFound();
            }

            _appDbContext.CourseContents.Remove(content);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseExists(int id)
        {
            return _appDbContext.Courses.Any(e => e.CourseId == id);
        }

        [HttpGet("feedback/{id}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbackForCourse(int id)
        {
            var feedbacks = await _appDbContext.Feedbacks
                .Where(f => f.CourseId == id)
                .Include(f => f.User) // Include related ApplicationUser
                .ToListAsync();
            return feedbacks;
        }

        [HttpPost("feedback")]
        public async Task<ActionResult<Feedback>> AddFeedback(Feedback feedback)
        {
            _appDbContext.Feedbacks.Add(feedback);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFeedbackForCourse), new { id = feedback.FeedbackId }, feedback);
        }

        [HttpGet("forums")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            return await _appDbContext.Posts.ToListAsync();
        }


        [HttpPost("forums")]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            _appDbContext.Posts.Add(post);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPosts), new { id = post.PostId }, post);
        }
    }
}
