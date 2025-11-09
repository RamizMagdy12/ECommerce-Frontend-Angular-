import { Component } from '@angular/core';
import { PaymobService } from '../../services/paymob-service';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
constructor(private paymob: PaymobService) {}

  payNow() {
    this.paymob.pay(200, 'Ramiz Magdy', 'ramiz@gmail.com', '01000000000');
  }
}
