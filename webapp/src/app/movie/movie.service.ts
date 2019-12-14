import { Injectable } from '@angular/core';
import { Movie } from './movie-info/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Observer, of } from 'rxjs';
import { AuthService } from '../site/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  movieUrl:string = environment.baseUrl;
  // username="user";
  // password="pwd";
  // headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username+":"+this.password) });
  

  fullMovies: Movie[];
//   fullMovies: Movie[]=[
//     {id:1,title:"Sandwich",price:99,active:true,dateOfLaunch:new Date('2017-03-15'),category:"Main Course",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"},
//   {id:2,title:"Burger",price:129,active:true,dateOfLaunch:new Date('2017-12-23'),category:"Main Course",freeDelivery:false,imageUrl:"https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
//   {id:3,title:"Pizza",price:149,active:true,dateOfLaunch:new Date('2019-08-21'),category:"Main Course",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"},
//   {id:4,title:"French Fries",price:57,active:false,dateOfLaunch:new Date('2017-07-02'),category:"Starter",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1526230427044-d092040d48dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//   {id:5,title:"Chocolate Brownie",price:32,active:true,dateOfLaunch:new Date('2022-11-02'),category:"Dessert",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80"}
// ];
  filter = new Subject();

  getFilter():Subject<Object>{
    return this.filter;
  }





  constructor(private http: HttpClient, private authService: AuthService) { 
    this.getMovies().subscribe(data=>{
      this.fullMovies=data;
      console.log("from movie service");
      console.log(this.fullMovies);
    });
  }

  getMovies():Observable<Movie[]> {

    if(this.authService.userAuthenticated.username===''){
    return this.http.get<Movie[]>(this.movieUrl);
    }
    else {
      const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.userAuthenticated.accessToken });
      return this.http.get<Movie[]>(this.movieUrl, {headers});
    }
    // return of (this.fullMovies);
  }

  getMoviesForCustomer(movies:Movie[]):Movie[]{
    const today = new Date();
    const customerMovies:Movie[] = movies.filter(movie => {
        return movie.active && new Date(movie.dateOfLaunch) <= today;
        // return movie.active;
    });
    // console.log("customer food items: "+customerMovies)
    return customerMovies;
  }

  
  getMoviesFiltered(title: string,fullMovies:Movie[]): Movie[] {
    console.log("inside filter and isAdmin: "+ this.authService.isAdminUser());
    // fullMovies = this.authService.isAdminUser() ? fullMovies: this.getMoviesForCustomer(fullMovies);
    if(title!=''){
      const result = fullMovies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
      return result ? result : [];
    } else {
        return fullMovies;
    }
  } 
  
  
  getMovie(itemId: number):Observable<any>{
/*     return Observable.create((observer: Observer<Movie>)=> {
      this.getMovies().subscribe((movies)=>{
              const movie = movies.find( movie => movie.id == itemId);
              observer.next(movie);
      });
    }); */
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.userAuthenticated.accessToken });
    return this.http.get<Movie>(this.movieUrl + '/' + itemId,{headers});
  }


  updateMovie(movie: Movie):Observable<boolean>{
    //UPDATE THE TEMPORARY FOOD ITEM LIST IN THE COMPONENT
/*     const itemId = this.fullMovies.findIndex(movieOriginal => movieOriginal.id === movie.id);
    console.log(movie)
    this.fullMovies[itemId] = movie; */
    
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.userAuthenticated.accessToken });
    return this.http.put<boolean>(this.movieUrl,movie,{headers});
    
  }


  


  
}
