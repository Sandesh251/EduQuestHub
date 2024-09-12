import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreatecourseComponent } from './Pages/createcourse/createcourse.component';
import { FormsModule } from '@angular/forms';
import { CourseComponent } from './Pages/course/course.component';
import { MycoursesComponent } from './Pages/mycourses/mycourses.component';
import { CoursecontentComponent } from './Pages/coursecontent/coursecontent.component';
import { FeedbackComponent } from './Pages/feedback/feedback.component';
import { ForumsComponent } from './Pages/forums/forums.component';
import { UsersComponent } from './Pages/users/users.component';



@NgModule({
  declarations: [


    CreatecourseComponent,
      CourseComponent,
      MycoursesComponent,
      CoursecontentComponent,
      FeedbackComponent,
      ForumsComponent,
      UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
