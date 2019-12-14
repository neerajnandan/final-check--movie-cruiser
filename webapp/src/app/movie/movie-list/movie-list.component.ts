import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie-info/movie';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/site/auth.service';
import { FavoritesService } from 'src/app/booking/favorites.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  fullMovies:Movie[]=[];
  filteredMovies:Movie[]=[];
  alreadyExists:boolean=false;
   
  
    constructor(private movieService: MovieService,
       private favoritesService: FavoritesService,
       private router:Router,
       private authService: AuthService,
       ) { }
  
    ngOnInit() {
      //TO GET ALL THE FOOD ITEMS INTO THE MENU COMPONENT
      this.movieService.getMovies()
        .subscribe(
          (data:Movie[]) =>  {
          this.fullMovies = [...data];
          this.filteredMovies = this.fullMovies;
        /*  this.filteredMovies = this.authService.isAdminUser() ? 
                            this.fullMovies: this.movieService.getMoviesForCustomer(this.fullMovies);  */
        }
        );
  
        this.movieService.getFilter().subscribe(
          (title: string) => {
            // console.log('filtering done');
  
            this.filteredMovies = this.movieService.getMoviesFiltered(title,this.fullMovies);
        }
        );
  
       
  
  
      }
  
  
      // ngDoCheck(){
      //   console.log("docheck vilichu")
      //   this.filteredMovies = this.authService.isAdminUser() ? 
      //   this.fullMovies: this.movieService.getMoviesForCustomer(this.fullMovies);
      // }
      addToFavorites(itemId:number){
        // this.favoritesService.addToFavorites(itemId,1);
        if(!this.authService.loggedInUser){
          console.log("this is itemid "+itemId)
            this.router.navigate(['/favorites'],  { queryParams: { id: itemId }});
            // this.router.navigate(['/favorites']);
        }else{
          this.favoritesService.addToFavoritesRest(itemId,1).subscribe(data=>{
            console.log("item added to favorites: "+data);
            if(data) {
              this.favoritesService.setMovieAdded(data);
            } else {
              this.favoritesService.setAlreadyExists(data);
          }
          

          });
        }
      }
  }
