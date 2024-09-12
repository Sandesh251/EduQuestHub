import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatecourseComponent } from './Pages/createcourse/createcourse.component';
import { CourseComponent } from './Pages/course/course.component';
import { MycoursesComponent } from './Pages/mycourses/mycourses.component';
import { CoursecontentComponent } from './Pages/coursecontent/coursecontent.component';
import { FeedbackComponent } from './Pages/feedback/feedback.component';
import { ForumsComponent } from './Pages/forums/forums.component';
import { UsersComponent } from './Pages/users/users.component';

const routes: Routes = [
  {path : 'create-course', component : CreatecourseComponent},
  {path : 'course-list', component : CourseComponent},
  {path : 'mycourses', component: MycoursesComponent},
  {path : 'course-content/:id', component: CoursecontentComponent},
  {path : 'feedback/:type/:id', component: FeedbackComponent},
  {path : 'forums', component : ForumsComponent},
  {path : 'users', component : UsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
