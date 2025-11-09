import { Component } from '@angular/core';
import { ICartItem } from '../../interfaces/icart-item';
import { CartService } from '../../services/cart-service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,CommonModule ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
cartItems : ICartItem[] = [];

constructor(private cartService: CartService, private router:Router) {  }
ngOnInit() {
  this.cartService.cart$.subscribe(items => {
    this.cartItems = items;
  });
}

inCreaseQuantity(id: number) {
  this.cartService.increaseQuantity(id);  
}
deCreaseQuantity(id: number) {
  this.cartService.decreaseQuantity(id);  
}
removeItem(id: number) {
  this.cartService.removeFromCart(id);  
}
getTotalPrice(){
  return this.cartService.getTotalPrice();
}
getTotalItems(){
  return this.cartService.getTotalItems();  
}
clearCart(){
  this.cartService.clearCart();
}
goToPayment() {
    this.cartService.goToPayment();
  }
  continueShopping() {
    this.router.navigate(['/']); // غير المسار حسب صفحة التسوق عندك
  }
}
