import { FavoritesService } from './../../booking/favorites.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLoginValid: boolean = true;
  authSource: string;
  submitClicked: boolean = false;
  itemId:number = -1;

  

  constructor(public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private favoritesService:FavoritesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.authSource = params['from'];
      if(!(this.authSource===undefined)){
      this.itemId = +this.authSource.substring(this.authSource.indexOf('=')+1);
      console.log("this.itemId"+this.itemId)
      this.authSource = this.authSource.substring(0,this.authSource.indexOf('?'));
      }
    });
  }


  
  onSubmit(loginForm: NgForm) {
    this.submitClicked = true;
    const username = loginForm.value.username;
    const password = loginForm.value.password;
    if (username === 'yoyoboy') { // temporary to show the invalid user login
      this.isLoginValid = false;
    } else {
      this.authService.login(username, password);
     
      // if(this.authService.isAdminUser() && this.authService.loggedInUser){
      //   this.router.navigate(['/menu']);
      // } else
      
 /*       if(this.authService.loggedInUser) {
        this.router.navigate(['/menu']);
      } else {
      this.isLoginValid = false;
      } */
      
      this.authService.getIsLoginValidSubject().subscribe(invalidLogin=>{
        if(invalidLogin) {
          this.isLoginValid=false;
        }
         else if(this.itemId!=-1){
          console.log(this.itemId)
          this.favoritesService.addToFavoritesRest(this.itemId,1).subscribe(data=>{
            console.log("item added to favorites: "+data);
            if(data) {
              this.favoritesService.setMovieAdded(data);
            } else {
              this.favoritesService.setAlreadyExists(data);
          }
          this.itemId=-1;
        });
        } 


        });
    /*   setTimeout(()=>{
        if(!this.authService.loggedInUser) {
          this.isLoginValid=false;
        }
      }
      ,4000); */
   
    
    }

/*    invalid(){
     console.log("login invalid is"+sessionStorage.getItem('loginInvalid'));
    if(sessionStorage.getItem('loginInvalid')==='true') {
      this.isLoginValid=false;
    } */
  

}

}
