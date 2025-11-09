import { Component } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { map, Observable, of } from 'rxjs';
import { ProductService } from '../../services/product-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';
import Swal from 'sweetalert2';
import { WishListService } from '../../services/wish-list-service';
import { IWishList } from '../../interfaces/iwish-list';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  product$!: Observable<IProduct[]>;
  categories$: Observable<string[]> | undefined;
  selectedCategory: string = '';
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishListService: WishListService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.categories$ = this.productService.getAllCategories();
  }

  loadProducts() {
    this.product$ = this.productService.getAllProducts().pipe(
      map((res: any) => res.products)
    );
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === '' || category === 'all') this.loadProducts();
    else this.product$ = this.productService.getProductsByCategory(category);
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    if (term.trim() === '') this.filterByCategory(this.selectedCategory);
    else {
      this.product$ = this.product$?.pipe(
        map(products =>
          products.filter(p =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
          )
        )
      ) ?? of([]);
    }
  }

  viewDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  addToCart(product: IProduct) {
    if (!this.auth.isLoggedIn()) {
      Swal.fire({
        title: '⚠️ Login Required',
        text: 'You must be logged in to add products to your cart.',
        icon: 'warning',
        confirmButtonText: 'Login'
      }).then(res => {
        if (res.isConfirmed) this.router.navigate(['/login']);
      });
      return;
    }

    this.cartService.addToCart({ product, quantity: 1 });
    Swal.fire({
      title: '✅ Added Successfully!',
      text: `${product.title} has been added to your cart.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  toggleWishlist(product: IProduct) {
    if (!this.auth.isLoggedIn()) {
      Swal.fire({
        title: '⚠️ Login Required',
        text: 'You must be logged in to add products to your wishlist.',
        icon: 'warning',
        confirmButtonText: 'Login'
      }).then(res => {
        if (res.isConfirmed) this.router.navigate(['/login']);
      });
      return;
    }

    const stored = localStorage.getItem('wishlist');
    let wishlist: any[] = stored ? JSON.parse(stored) : [];
    const exists = wishlist.find(x => x.product.id === product.id);

    if (exists) this.wishListService.removeFromWishlist(product.id);
    else this.wishListService.addToWishlist(product);
  }

  isInWishlist(product: IProduct): Observable<boolean> {
    return this.wishListService.wishlist$.pipe(
      map((wishlist: IWishList[]) =>
        wishlist.some((x: IWishList) => (x.product?.id || x.product.id) === product.id)
      )
    );
  }
}
