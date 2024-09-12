import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/admin/Service/course.service';
import { AuthService } from 'src/auth/Service/auth.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit{
  courseList : any[] = [];
  type = 'formFeedback';
  loading = false;
  constructor(
    private courseService : CourseService,
    private toastr: ToastrService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getMyCourses();
  }

  getMyCourses(){
    this.loading = true;
    this.courseService.getMyCourses(this.authService.userid).subscribe((res)=>{
      this.courseList = res;
      // console.log('Courses:', res);
      this.loading = false;
    }, error => {
      // console.log('Error:', error);
      this.loading = false;
    })
  }


  navigateContent(courseId : number){
    // console.log('Course:', courseId);
    this.router.navigate([`/admin/course-content/${courseId}`]);
  }


  navigateFeed(courseId : number){
    this.router.navigate(['/admin/feedback', this.type, courseId]);
  }

}
