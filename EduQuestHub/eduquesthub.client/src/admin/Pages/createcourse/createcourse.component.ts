import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/admin/Service/course.service';

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent {
  course : any = {};
  files: File[] = [];
  contentTypes: string[] = ['Video', 'PDF'];
  selectedType: string;
  courseCreateForm : boolean = false;
  loading : boolean = false;

  constructor(private courseService: CourseService, private toastr : ToastrService, private router : Router) { }


  onChange(event): void {
    // console.log('Selected type:', this.selectedType)

    this.selectedType = event.target.value;
    // console.log('Selected type:', this.selectedType)
  }
  createCourse(): void {
    this.loading = true;
    if(!this.course.title || !this.course.description){
      this.toastr.warning('All fields are required');
      this.loading = false;
      return
    }
    this.courseService.createCourse(this.course)
      .subscribe((response) => {
        // console.log('Course created successfully:', response);
        this.course.courseId = response.courseId;
        this.courseCreateForm = true;
        this.loading = false;
        // Reset form or handle success accordingly
      }, (error) => {
        console.error('Error creating course:', error);
        this.loading = false;
        // Handle error accordingly
      });
  }

  onFileSelected(event: any): void {
    this.files = event.target.files;
    // console.log('Files selected:', this.files);
  }

  uploadContent(): void {
    this.loading = true;
    if(this.selectedType == undefined || this.selectedType == ''){
      this.toastr.warning('Please select content type');
      this.loading = false;
      return
    }
    const formData = new FormData();
    formData.append('type', this.selectedType);
    for (const file of this.files) {
      // console.log(file)
      formData.append('files', file);
    }
    // console.log('Form data:', formData);
    this.courseService.uploadContent(this.course.courseId, this.selectedType, this.files)
      .subscribe(() => {
        this.toastr.success('Content uploaded successfully');
        this.router.navigate(['/admin/courses']);
        this.loading = false;
        // Reset form or handle success accordingly
      }, (error) => {
        console.error('Error uploading content:', error);
        this.loading = false;
        // Handle error accordingly
      });
  }
}
