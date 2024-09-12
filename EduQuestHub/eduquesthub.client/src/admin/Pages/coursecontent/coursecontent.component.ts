import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/admin/Service/course.service';
import { AuthService } from 'src/auth/Service/auth.service';

@Component({
  selector: 'app-coursecontent',
  templateUrl: './coursecontent.component.html',
  styleUrls: ['./coursecontent.component.css']
})
export class CoursecontentComponent implements OnInit{
  courseId : number = 0;
  contents : any[] = [];
  courseDetails = [];
  loading : boolean = false;

  constructor(
    private courseService : CourseService,
    private route : ActivatedRoute,
    private toastr : ToastrService,
    private auth : AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.courseId = params['id'];
      // console.log('CourseId:', this.courseId);
      this.getContent();
    })
    this.getContent();
    this.getSpecificCourse();
  }

  getSpecificCourse(){
    this.loading = true;
    this.courseService.getCourseSpecific(this.courseId).subscribe((res)=>{
      // console.log('Course:', res);
      this.courseDetails = res;
      this.loading = false;
    })
  }

  getContent(){
    this.loading = true;
     this.courseService.getContents(this.courseId).subscribe((res)=>{
      this.contents = res;
      // this.getAssets();
    // console.log('Contents:', res);
    this.loading = false;
  }, error => {
    // console.log('Error:', error);
    this.loading = false;
  })
  }


  getAssets(){
    this.loading = true;
    this.contents.forEach((content)=>{
      // console.log('Content:', content.courseContentId);
    this.courseService.getAssets(this.courseId, content.courseContentId).subscribe((res)=>{
      content.assets = res;
      // console.log('Assets:', res);
      this.loading = false;
    }, error => {
      // console.log('Error:', error);
      this.loading = false;
    })
    }
  )
  }

  getContentUrl(content: any): string {
    return `http://localhost:5152/api/Course/course/${content.courseId}/content/${content.courseContentId}`;
}

openPdfInNewTab(content: any): void {
  const url = this.getContentUrl(content);
  window.open(url, '_blank');
}

unenroll(){
  this.courseService.unenrollCourse( this.courseId, this.auth.userid ).subscribe((res)=>{
    // console.log('Unenroll:', res);
    this.toastr.success('Unenrolled Successfully');
  })
}

}
