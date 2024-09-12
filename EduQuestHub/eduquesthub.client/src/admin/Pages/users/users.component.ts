import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/auth/Service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loading = false;
  users : any[] = [];

  constructor(
    private authService : AuthService, private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

getUsers(){
  this.loading = true;
  this.authService.getUsers().subscribe(
    (res) => {
      this.users = res.filter((user) => {
        return user.fullName !== 'admin'; // Return the filtered users
      });
      // console.log('Users:', this.users);
      this.loading = false;
    },
    (error) => {
      // console.log('Error:', error);
      this.loading = false;
    }
  );
}


  deleteUser(id : string){
    this.loading = true;
    this.authService.deleteUser(id).subscribe((res)=>{
      // console.log('User:', res);
      this.toastr.success('User Deleted Successfully');
      this.getUsers();
      this.loading = false;
    }, error => {
      // console.log('Error:', error);
      this.loading = false;
    })
  }

}
