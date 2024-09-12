import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/auth/Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData : any = {};
  loading : boolean = false;

  constructor (
    private authService : AuthService,
    private toastr : ToastrService,
    private router : Router
  ){}

  submit(){
    this.loading = true;
    // console.log(this.formData);
    if(this.formData.password != this.formData.confirmPassword){
      this.toastr.warning('Password and Confirm Password do not match');
      this.loading = false;
      return;
    }

    if(!this.formData.email || !this.formData.password || !this.formData.confirmPassword || !this.formData.fullName || !this.formData.phoneNumber)
    {
      this.toastr.warning('All fields are required');
      this.loading = false;
      return;
    }

    const body = {
      email : this.formData.email,
      fullName : this.formData.fullName,
      phoneNumber : this.formData.phoneNumber,
      password : this.formData.password
    }

    this.authService.register(body).subscribe((res : any) => {
      this.toastr.success('Registration Successful, Please Login');
      this.formData = {};
      this.router.navigate(['/auth/login']);
      // console.log(res);
      this.loading = false;
    },error => {
      // console.log(error);
      this.loading = false;
      this.toastr.error('Registration Failed, Email might have been already used!, Make sure paswword has atleast 8 characters and contains a number and a special character');
    }
    )
  }
}
