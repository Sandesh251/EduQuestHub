import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { User } from 'src/Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubjet = new BehaviorSubject<User>(null);
  currentUser = this.currentUserSubjet.asObservable();
  loggedIn = false;
  role : string = '';
  userid : string = '';

  constructor(private http: HttpClient, private router : Router) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUserSubjet.next(JSON.parse(currentUser));
      this.role = this.currentUserSubjet.value.role;
      this.userid = this.currentUserSubjet.value.id;
      // console.log(this.role)
      this.loggedIn = true;
    } else {
      this.currentUserSubjet.next(null);
      this.loggedIn = false;
    }
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      Password: password,
    };

    return this.http.post(`/api/Auth/login`, body).pipe(
      map((res: any) => {
        // console.log(res);
        this.currentUserSubjet.next(res);
        this.role = this.currentUserSubjet.value.role;
        this.userid = this.currentUserSubjet.value.id;
        this.loggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(res));
        return res;
      })
    );
  }

  register(body : any){
    return this.http.post(`/api/Auth/register`, body);
  }

  getUsers(){
    return this.http.get<any>(`/api/Auth/users`);
  }

  deleteUser(id : string){
    return this.http.delete(`/api/Auth/users/${id}`);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubjet.next(null);
    this.loggedIn = false;
    this.router.navigate(['']);
  }
}
