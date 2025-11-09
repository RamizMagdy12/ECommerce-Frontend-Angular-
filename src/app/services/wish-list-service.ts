import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWishList } from '../interfaces/iwish-list';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private wishlist: IWishList[] = [];
  private wishlistSubject = new BehaviorSubject<IWishList[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      this.wishlist = JSON.parse(stored);
      this.wishlistSubject.next(this.wishlist);
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this.wishlistSubject.next(this.wishlist);
  }

  addToWishlist(product: any) {
    const exists = this.wishlist.find(x => x.product.id === product.id);
    if (!exists) {
      this.wishlist.push({ product });
      this.updateLocalStorage();
    }
  }

  removeFromWishlist(id: number) {
    this.wishlist = this.wishlist.filter(x => x.product.id !== id);
    this.updateLocalStorage();
  }

  clearWishlist() {
    this.wishlist = [];
    this.updateLocalStorage();
  }
}
