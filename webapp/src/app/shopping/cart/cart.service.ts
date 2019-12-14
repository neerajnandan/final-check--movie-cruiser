import { Injectable, Output, EventEmitter } from '@angular/core';
import { FoodItem } from 'src/app/food/item-info/food-item';
import { Cart } from './cart';
import { UUID } from 'angular2-uuid';
import { FoodService } from 'src/app/food/food.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  @Output() cartUpdated = new EventEmitter();
  
  foodItems:FoodItem[]; //temporary
  cart: Cart = {
    cartItems :null,
    total : 0
  };

  constructor(private foodService: FoodService) {


      //this is temporary to get the foodItems object
      // this.foodService.getFoodItems()
      // .subscribe(
      //   (foodItems:FoodItem[])=> {
      //     this.foodItems = foodItems;
      //     // console.log(this.foodItems[1]);
      //     this.cart.cartItems=  [{ itemId: 1, foodItem: this.foodItems[0], quantity:1 }];
      //     this.cart.cartItems.push({ itemId: 2, foodItem: this.foodItems[1], quantity:1 });
      //     this.cart.total = this.calculateTotalPrice();
      //   });
   }

   getCart(){
     return this.cart;
   }

   

   //INVOKED BY OUTPUT INJECTOR OF CART
  addToCart(itemId:number){
        this.foodService.getFoodItem(itemId)
              .subscribe((foodItemtobeAdded:FoodItem)=>{
                  const uniqID = UUID.UUID();
                  if(this.cart.cartItems === null){
                    this.cart.cartItems = [{itemId: uniqID, foodItem: foodItemtobeAdded}];
                    this.cart.total = 1;
                  } else {
                    this.cart.cartItems.push({itemId: uniqID, foodItem: foodItemtobeAdded});
                    this.cart.total += 1;
                  }
              });

  }

  RemoveCartItem(cartItemId:string){
    let itemIndex = this.cart.cartItems.findIndex(cartItem => cartItem.itemId===cartItemId);
    let itemToBeRemoved = this.cart.cartItems.splice(itemIndex,1)[0];
    this.cart.total -= 1;
  }

  clearCart() {
    this.cart.cartItems = null;
    this.cart.total = 0;
  }


  
}
