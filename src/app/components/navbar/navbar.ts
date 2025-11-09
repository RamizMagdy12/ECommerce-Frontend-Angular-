import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  counter$!: Observable<number>;
  isLoggedIn = false;
  currentUser: any = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.counter$ = this.cartService.cart$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  goToWishlist() {
    if (!this.isLoggedIn) {
      Swal.fire({
        title: '⚠️ Login Required',
        text: 'You must log in to view your wishlist.',
        icon: 'warning',
        confirmButtonText: 'Login'
      }).then(result => {
        if (result.isConfirmed) this.router.navigate(['/login']);
      });
      return;
    }
    this.router.navigate(['/wishlist']);
  }

  goToCart() {
    if (!this.isLoggedIn) {
      Swal.fire({
        title: '⚠️ Login Required',
        text: 'You must log in to view your shopping cart.',
        icon: 'warning',
        confirmButtonText: 'Login'
      }).then(result => {
        if (result.isConfirmed) this.router.navigate(['/login']);
      });
      return;
    }
    this.router.navigate(['/cart']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
