import { Injectable, Input } from '@angular/core';
import { FoodItem } from './item-info/food-item';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Observer, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private food_url = '/assets/data/fooditems.json';
  fullFoodItems: FoodItem[]=[
    {id:1,title:"Avathar",price: 46584566642,active:true,dateOfLaunch:new Date('2017-03-15'),genre:"Drama",freeDelivery:true,imageUrl:"https://i.pinimg.com/originals/43/aa/ad/43aaada6d7ceed12c5b91a21d3e7a676.jpg"},
  {id:2,title:"Titanic",price: 54987243218964,active:true,dateOfLaunch:new Date('2017-12-23'),genre:"Romance",freeDelivery:false,imageUrl:"https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png"},
  {id:3,title:"Fast and Furious",price: 5416544612,active:true,dateOfLaunch:new Date('2019-08-21'),genre:"Action",freeDelivery:true,imageUrl:"https://images-na.ssl-images-amazon.com/images/I/91BKgM1kuiL._SL1500_.jpg"},
  {id:4,title:"Iron Man",price: 126516565,active:false,dateOfLaunch:new Date('2017-07-02'),genre:"Action",freeDelivery:true,imageUrl:"https://upload.wikimedia.org/wikipedia/en/7/70/Ironmanposter.JPG"},
  {id:5,title:"Batman",price: 123456789,active:true,dateOfLaunch:new Date('2022-11-02'),genre:"Action",freeDelivery:true,imageUrl:"https://cdn1.thr.com/sites/default/files/imagecache/NFE_portrait/2011/08/120169546_a_p_0.jpg"}
];
  filter = new Subject();

  getFilter():Subject<Object>{
    return this.filter;
  }


  constructor(private http: HttpClient) { }

  getFoodItems():Observable<FoodItem[]> {
    // return this.http.get<FoodItem[]>(this.food_url);
    return of (this.fullFoodItems);
  }

  
  getFoodItemsFiltered(title: string,fullFoodItems:FoodItem[]): FoodItem[] {
    if(title!=''){
      const result = fullFoodItems.filter(foodItem => foodItem.title.toLowerCase().includes(title.toLowerCase()));
      return result ? result : [];
    }
    else {
        return fullFoodItems;
    }
  }
  
  
  getFoodItem(itemId: number):Observable<any>{
    return Observable.create((observer: Observer<FoodItem>)=> {
      this.getFoodItems().subscribe((foodItems)=>{
              const foodItem = foodItems.find( foodItem => foodItem.id == itemId);
              observer.next(foodItem);
      });
    


    });
  }


  updateFoodItem(foodItem: FoodItem){
    //UPDATE THE TEMPORARY FOOD ITEM LIST IN THE COMPONENT
    const itemId = this.fullFoodItems.findIndex(foodItemOriginal => foodItemOriginal.id === foodItem.id);
    console.log(foodItem)
    this.fullFoodItems[itemId] = foodItem;
  }
  









  /* getFoodItems(active: boolean, launchDate: Date): FoodItem[]{
    return this.fooditems;
  } */

  
}
