import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/admin/Service/course.service';
import { AuthService } from 'src/auth/Service/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{
  type = '';
  id = 0;
  feedback : '';
  courseDetails = [];
  feedbacks : any[] = [];
  loading : boolean = false;
  innerLoad : boolean = false;
  constructor (
    private courseService : CourseService,
    private route : ActivatedRoute,
    private authService : AuthService,
    private toastr : ToastrService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      // console.log('Params:', params['id']);
      // console.log('Params:', params['type']);
      this.id = params['id'];
      this.type = params['type'];

    })

    if(this.type === 'viewFeedback'){
      this.getFeedback();

    }

    this.courseService.getCourseSpecific(this.id).subscribe((res)=>{
      // console.log('Course:', res);
      this.courseDetails = res;
    })
  }


  postFeedback(){
    this.innerLoad = true;
    if(this.feedback === ''){
      this.toastr.error('Please enter feedback');
      return;
    }
    const body = {
      courseId : this.id,
      userId : this.authService.userid,
      message : this.feedback

    }
    this.courseService.addFeedback(body).subscribe((res)=>{
      // console.log('Feedback:', res);
      this.toastr.success('Feedback Added Successfully');
      this.type = 'viewFeedback';
      this.getFeedback();
      this.innerLoad = false;
    }, error => {
      // console.log('Error:', error);
      this.innerLoad = false;
    })
  }

  getFeedback(){
    this.loading = true;
    this.courseService.getFeedback(this.id).subscribe((res)=>{
      // console.log('Feedback:', res);
      this.feedbacks = res;
      this.loading = false;
    }, error => {
      // console.log('Error:', error);
      this.loading = false;
    })
  }

}
