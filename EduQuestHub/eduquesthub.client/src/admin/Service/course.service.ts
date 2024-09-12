import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  createCourse(course: any) {
    return this.http.post<any>(`/api/Course`, course);
  }

  uploadContent(courseId: number, type : string, files: File[]){
    const formData = new FormData();
    formData.append('type', type);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    // console.log('Model:', formData);
    return this.http.post<any>(`/api/Course/${courseId}`, formData);
  }

  getCourseList(){
    return this.http.get<any>(`/api/Course/courses`);
  }

  deleteCourse(courseId : number){
    return this.http.delete<any>(`/api/Course/course/${courseId}`);
  }

  enrollCourse(courseId : number, userId : string){
    return this.http.post<any>(`/api/Enrollment/enroll/${userId}/${courseId}`, {});
  }

  getMyCourses(userId : string){
    return this.http.get<any>(`/api/Enrollment/mycourses/${userId}`);
  }

  getContents(courseId : number){
    return this.http.get<any>(`/api/Course/course/${courseId}/content`);
  }

  getAssets(courseId : number, contentId : number){
    return this.http.get<any>(`/api/Course/course/${courseId}/content/${contentId}`);
  }

  getCourseSpecific(courseId : number){
    return this.http.get<any>(`/api/Course/courses/${courseId}`);
  }

  unenrollCourse(courseId : number, userId : string){
    return this.http.delete<any>(`/api/Enrollment/unenroll/${userId}/${courseId}`);
  }

  addFeedback(body : any){
    return this.http.post<any>(`/api/Course/feedback`, body);
  }

  getFeedback(courseId : number){
    return this.http.get<any>(`/api/Course/feedback/${courseId}`);
  }

  getForums(){
    return this.http.get<any>(`/api/Course/forums`);
  }

  addForums(body){
    return this.http.post<any>(`/api/Course/forums`, body);
  }
}
