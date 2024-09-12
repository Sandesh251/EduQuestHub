import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/admin/Service/course.service';
import { AuthService } from 'src/auth/Service/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  type = 'viewFeedback';
  loading : boolean = false;
  courseList : any[] = [];
  constructor(
    private courseService : CourseService,
    public authService : AuthService,
    private toastr: ToastrService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(){
    this.loading = true;
    this.courseService.getCourseList().subscribe((res)=>{
      // console.log('Course:', res);
      this.courseList = res;
      this.loading = false;
    }, error => {
      // console.log('Error:', error);
      this.loading = false;
    })
  }

  deleteCourse(courseId : number){
    this.loading = true;
    this.courseService.deleteCourse(courseId).subscribe((res)=>{
      // console.log('Course:', res);
      this.toastr.success('Course Deleted Successfully');
      this.getCourse();
    }, error => {
      // console.log('Error:', error);
      this.loading = false;
    })

  }

  enroll(courseId : number){
    this.loading = true;
    this.courseService.enrollCourse(courseId, this.authService.userid).subscribe((res)=>{
      // console.log('Course:', res);
      this.toastr.success('Course Enrolled Successfully');
      this.router.navigate(['/admin/mycourses']);
      this.loading = false;
      // this.getCourse();
    }, error => {
      // console.log('Error:', error);
      this.toastr.error(error.error.message);
      this.loading = false;
    })
  }

  navigate(){
    this.router.navigate(['/admin/create-course']);
  }

  navigateFeed(courseId : number){
    this.router.navigate(['/admin/feedback', this.type, courseId]);
  }
  navigateContent(courseId : number){
    // console.log('Course:', courseId);
    this.router.navigate([`/admin/course-content/${courseId}`]);
  }



}
