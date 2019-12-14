import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser:boolean = false;
  userAuthenticated:User={username:'',firstName:'',lastName:'',role:'',accessToken:''};
  redirectUrl:string = "/";
  isAdmin:boolean = false;
  
  
    
  isLoginValidSubject = new Subject();

  getIsLoginValidSubject():Subject<Object>{
    return this.isLoginValidSubject;
  }

  constructor(private userService: UserService,
              private router: Router
              ) { }

  login(username:string, password:string){
/*       this.userService.authenticate(username, password).subscribe((user: User) => {
        if (user) {
          this.loggedInUser = true;
          this.userAuthenticated = user;
          this.isAdmin = user.role === 'Admin';
        }
      }); */
      this.userService.authenticate(username, password).subscribe((data: any) => {
        // console.log("this is the fetched token");
        let user:User=null;
          // console.log(data);
          // console.log("data.role " +data.role.substring(5));
          // console.log("data.token " +data.token);

          // user = this.userService.getUser(data.role.substring(5).toLowerCase());

          if(!this.userService.userExists(data.username)){

          user = { username: data.username, 
                      firstName: username, 
                      lastName: "", 
                      password: password, 
                      role: data.role,
                      accessToken: data.token};

          this.userService.userList.push(user);

          }else{
            user = this.userService.getUser(data.username);
            user.accessToken = data.token;
            // user.role="user";
            user.role = user.role === 'ADMIN' ? 'ADMIN' : 'USER';
          }
        if(user){
          // console.log("user logged in");
          this.loggedInUser = true;
          this.userAuthenticated = user;
          // console.log("user is ");
          // console.log(this.userAuthenticated);
          this.isAdmin = user.role == 'ADMIN';

          if(this.loggedInUser) {
            this.router.navigate(['/movies']);
            this.getIsLoginValidSubject().next(false);
            
          } else {
            // sessionStorage.setItem('loginInvalid','true');
            
          }


        }
        
    
      },
      (err)=>    { 
        // sessionStorage.setItem('loginInvalid', 'true');
        // console.log('error is '+err);
        // invalid();
        this.getIsLoginValidSubject().next(true);
      }  );

    }

    logOut() {
      this.redirectUrl = '/login'; // reset to root url
      this.loggedInUser = false;
      this.userAuthenticated = {username:'',firstName:'',lastName:'',role:'',accessToken:''};
      this.isAdmin = false;
    }

    isAdminUser() {
      return this.isAdmin;
    }
}