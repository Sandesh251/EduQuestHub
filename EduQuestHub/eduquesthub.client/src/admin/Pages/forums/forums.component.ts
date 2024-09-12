import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/admin/Service/course.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  fourms : any[] = [];
  title = '';
  description = '';
  creating = false;
  loading = false;
  innerLoading = false;

    constructor(
      private courseService : CourseService,
      private toastr : ToastrService
    ) { }

    ngOnInit(): void {
      this.getForums()
    }

    getForums(){
      this.loading = true;
      this.courseService.getForums().subscribe((res)=>{
        this.fourms = res;
        // console.log('Forums:', res);
        this.loading = false;
      }, error => {
        // console.log('Error:', error);
        this.loading = false;
      })
    }

    togglecreate(){
      this.creating = !this.creating;
    }

    postforums(){
      this.innerLoading = true;
      if(!this.title || !this.description){
        this.toastr.warning('All fields are required');
        this.innerLoading = false;
        return;

      }
      const body = {
        title : this.title,
        content : this.description
      }

      this.courseService.addForums(body).subscribe((res)=>{
        // console.log('Forums:', res);
        this.creating = false;
        this.toastr.success('Forums Added Successfully');
        this.getForums();
        this.innerLoading = false;
      })
    }
}
