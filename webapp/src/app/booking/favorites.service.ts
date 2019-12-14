import { Injectable, Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie/movie-info/movie';
import { Favorites } from './favorites/favorites';
import { MovieService } from '../movie/movie.service';
import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../site/auth.service';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {


  @Output() favoritesUpdated = new EventEmitter();
  
  favoritesUrl:string = environment.favoritesUrl;
  movies:Movie[]; //temporary
  favorites: Favorites = {
    favoritesItems :null,
    noOfFavorites : 0
  };
  
  alreadyExists:boolean = false;
  movieAdded:boolean = false;

  IdOfmovietobeAdded =-1;

  //hardcoded old one
  movietobeAdded:Movie =  {id:-1,title:null,boxOffice:null,active:null,dateOfLaunch:new Date('03/15/2017'),
                                  genre:null,hasTeaser:true,imageUrl:null};
 
  
  

  constructor(private http:HttpClient,
              private movieService: MovieService,
              private authService: AuthService) {

                // console.log("inside favorites service constructor");
      //this is temporary to get the movies object
      // this.movieService.getMovies()
      // .subscribe(
      //   (movies:Movie[])=> {
      //     this.movies = movies;
      //     // console.log(this.movies[1]);
      //     this.favorites.favoritesItems=  [{ itemId: 1, movie: this.movies[0], quantity:1 }];
      //     this.favorites.favoritesItems.push({ itemId: 2, movie: this.movies[1], quantity:1 });
      //     this.favorites.total = this.calculateTotalPrice();
      //   });
   }

   setAlreadyExists(flag:boolean){
     this.alreadyExists=true;
     setTimeout(() => {
      this.alreadyExists = false;
    }, 1000);
   }

   setMovieAdded(flag:boolean){
    this.movieAdded=true;
    setTimeout(() => {
     this.movieAdded = false;
   }, 1000);
  }

  
   getFavorites():Observable<Favorites>{
     
    if(!this.authService.loggedInUser){
     return of (this.favorites);
  } else {
     const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.userAuthenticated.accessToken });
     return this.http.get<Favorites>(this.favoritesUrl+'/'+this.authService.userAuthenticated.username, {headers});
    }
   }


   
   addToFavoritesRest(itemId:number,quantity:number):Observable<boolean>{
      this.IdOfmovietobeAdded = +itemId;
      // console.log("this.IdOfmovietobeAdded from favoritesservice");
      // console.log(this.IdOfmovietobeAdded);
     /*  this.movieAdded = true;
          setTimeout(() => {
            this.movieAdded = false;
          }, 1000); */
    const headers = new HttpHeaders({ Authorization: 'Bearer '+this.authService.userAuthenticated.accessToken});
    return this.http.post<boolean>(this.favoritesUrl+'/'+this.authService.userAuthenticated.username+'/'+itemId,"", {headers});
   }


 /*   //INVOKED BY OUTPUT INJECTOR OF CART
  addToFavorites(itemId:number,quantity:number){
        this.movieService.getMovie(itemId)
              .subscribe((movietobeAdded:Movie)=>{
                  const uniqID = UUID.UUID();
                  this.movietobeAdded = movietobeAdded;
                  if(this.favorites.favoritesItems === null){
                    this.favorites.favoritesItems = [{itemId: uniqID, movie: movietobeAdded, quantity:quantity}];
                    this.favorites.total = movietobeAdded.price;
                    this.movieAdded = true;
                    setTimeout(() => {
                      this.movieAdded = false;
                    }, 1000);
                  } else {

                    if(!this.favorites.favoritesItems.some(favoritesItem => favoritesItem.movie.id == movietobeAdded.id)){
                      this.favorites.favoritesItems.push({itemId: uniqID, movie: movietobeAdded, quantity:quantity});
                      this.favorites.total += movietobeAdded.price;
                      this.movieAdded = true;
                      setTimeout(() => {
                        this.movieAdded = false;
                      }, 1000);
                    }  else {
                      this.alreadyExists = true;
                      setTimeout(() => {
                        this.alreadyExists = false;
                      }, 1000);
                    }
                  }
              });

  }
 */

 //hardcoded implementation of remove
  RemoveFavoritesItem(favoritesItemId:string):Observable<boolean>{
/*     let itemIndex = this.favorites.favoritesItems.findIndex(favoritesItem => favoritesItem.itemId===favoritesItemId);
    let itemToBeRemoved = this.favorites.favoritesItems.splice(itemIndex,1)[0];
    this.favorites.total -= itemToBeRemoved.movie.price; */
    const headers = new HttpHeaders({ Authorization: 'Bearer '+this.authService.userAuthenticated.accessToken});
    return this.http.delete<boolean>(this.favoritesUrl+'/'+this.authService.userAuthenticated.username+'/'+favoritesItemId, {headers});

  }



  clearFavorites() {
    this.favorites.favoritesItems = null;
    this.favorites.noOfFavorites = 0;
  }


  
}
