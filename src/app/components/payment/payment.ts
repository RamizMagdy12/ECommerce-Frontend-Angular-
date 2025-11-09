import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  totalAmount: number = 1250;
  paymentMethod: string = 'card';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.totalAmount = this.cartService.getTotalPrice();
  }

  payNow() {
    if (this.paymentMethod === 'card') {
      if (!this.cardNumber || !this.expiryDate || !this.cvv) {
        Swal.fire({
          icon: 'warning',
          title: '⚠️ Warning',
          text: 'Please complete your card details.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f39c12',
          background: '#fffbea',
          color: '#333',
          showClass: {
            popup: 'animate__animated animate__pulse',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut',
          },
        });
        return;
      }
    }

    Swal.fire({
      icon: 'success',
      title: '✅ Payment Completed Successfully!',
      text: 'Thank you for shopping with us 💳',
      confirmButtonText: 'Done',
      confirmButtonColor: '#28a745',
      background: '#f6fff8',
      color: '#333',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }
}
