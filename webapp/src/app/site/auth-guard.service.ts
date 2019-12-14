import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  itemId: number = -1;

  constructor(private authService: AuthService, private router: Router,private actiroute: ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // retain the url that is requested for authorization
    this.authService.redirectUrl = state.url.substring(1);

    console.log('URL', state.url);
    console.log('URL', this.authService.redirectUrl);

    
    return Observable.create((observer: Observer<boolean>) => {
      if (this.authService.loggedInUser) {
        console.log('Logged in');
        observer.next(true);
      } else {
        console.log('Not Logged in');
        this.router.navigate(['login'], { queryParams: { from: this.authService.redirectUrl} });
      }
    });
  }
}
