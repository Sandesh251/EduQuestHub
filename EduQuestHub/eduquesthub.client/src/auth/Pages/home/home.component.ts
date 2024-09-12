import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/auth/Service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router : Router, private auth : AuthService , private toastr : ToastrService) { }

  nav(){
    if(this.auth.loggedIn){
      this.router.navigate(['/admin/course-list']);
    }else{
      this.router.navigate(['/auth/login']);
      this.toastr.warning('Please Login First');
    }
    // this.router.navigate(['/admin/course-list']);
  }
}
