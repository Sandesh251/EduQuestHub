import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/auth/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData : any = {};
  loading : boolean = false;

  constructor (private authService : AuthService, private router : Router, private toastr : ToastrService){
    this.formData = {};
    if(this.authService.loggedIn){
      this.authService.currentUser.subscribe((res : any) => {
        // console.log(res);
      });
      this.router.navigate(['/home']);
    }
  }

  submit(){
    this.loading = true;
    // console.log(this.formData);

    this.authService.login(this.formData.email, this.formData.password).subscribe((res : any) => {
      // console.log(res);
      this.toastr.success('Logged in Successfully!')
      this.router.navigate(['']);
      this.loading = false;
    }, error => {
      // console.log(error);
      this.toastr.error('Invalid Email or Password');
      this.loading = false;
    })
  }
}
