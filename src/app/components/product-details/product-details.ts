import { Component } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product$!: Observable<IProduct>;
  quantity: number = 1;
  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        console.log('📦 Product ID from route:', id);
        return this.productService.getProductById(id);
      })
    );
  }

  addToCart(product: IProduct) {
    if (this.quantity < 1) this.quantity = 1;
    this.cartService.addToCart({ product, quantity: this.quantity });
    Swal.fire({
      title: 'Added to Cart!',
      text: `${product.title} has been successfully added to your cart.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  continueShopping() {
    this.router.navigate(['/']);
  }
}
