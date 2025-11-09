import { Injectable } from '@angular/core';
import { ICartItem } from '../interfaces/icart-item';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: ICartItem[] = [];
  private cartSubject = new BehaviorSubject<ICartItem[]>([]);
  cart$ = this.cartSubject.asObservable();
  constructor(private router:Router) { }

  addToCart(product: ICartItem) {
    const existingItem = this.items.find(item => item.product.id === product.product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity;
    }else {
      this.items.push(product);
  }
  this.cartSubject.next(this.items);
}
removeFromCart(productId: number) {
  this.items = this.items.filter(item => item.product.id !== productId);
  this.cartSubject.next(this.items);
}
increaseQuantity(productId: number) {
  const item = this.items.find(item => item.product.id === productId);
  if (item) {
    item.quantity++;
    this.cartSubject.next(this.items);
  }
}
decreaseQuantity(productId: number) {
  const item = this.items.find(item => item.product.id === productId);
  if (item && item.quantity > 1) {
    item.quantity--;
    this.cartSubject.next(this.items);
  }
}
getTotalPrice(): number {
 return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
getTotalItems(): number {
  return this.items.reduce((total, item) => total + item.quantity, 0);
}

// لو عايز Observable تحدث نفسها في الـ HTML
getTotalItemsObservable() {
  return this.cart$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );
}
clearCart() {
  this.items = [];
  this.cartSubject.next(this.items);
}
goToPayment() {
    this.router.navigate(['/payment']);
  }
}

