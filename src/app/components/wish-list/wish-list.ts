import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IWishList } from '../../interfaces/iwish-list';
import { WishListService } from '../../services/wish-list-service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wish-list.html',
  styleUrls: ['./wish-list.css']
})
export class WishList {
  wishlistItems: IWishList[] = [];
  

  constructor(private wishlistService: WishListService, private router: Router) {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  remove(id: number) {
    this.wishlistService.removeFromWishlist(id);
  }

  viewProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
