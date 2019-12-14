import { Component, OnInit } from '@angular/core';
import { Favorites } from './favorites';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {



    favoritesUpdated;
    favorites: Favorites = {
      favoritesItems :null,
      noOfFavorites : 0
    };
  
    constructor(private favoritesService: FavoritesService) {
     }
  
    ngOnInit() {
    
        this.getFavorites();
  
      }
  
      getFavorites(){
        this.favoritesService.getFavorites().subscribe(data=>{
          this.favorites = data;
          console.log(this.favorites);
        });
      }
  
      onRemoveFavoritesItem(favoritesItemId:string){
        this.favoritesService.RemoveFavoritesItem(favoritesItemId).subscribe(data=>{
          this.favoritesUpdated=data;
          this.getFavorites();
  
        });
      }
  
  }
