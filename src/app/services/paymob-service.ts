import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PaymobService {
  private apiKey = 'YOUR_API_KEY'; 
  private integrationId = 123456;  
  private iframeId = 123456;       

  constructor(private http: HttpClient) {}

  async pay(amount: number, name: string, email: string, phone: string) {
    try {
      // 1️⃣ Auth Request
      const auth = await this.http.post<any>(
        'https://accept.paymob.com/api/auth/tokens',
        { api_key: this.apiKey }
      ).toPromise();

      // 2️⃣ Create Order
      const order = await this.http.post<any>(
        'https://accept.paymob.com/api/ecommerce/orders',
        {
          auth_token: auth.token,
          delivery_needed: false,
          amount_cents: amount * 100,
          currency: 'EGP',
          items: []
        }
      ).toPromise();

      // 3️⃣ Get Payment Key
      const paymentKey = await this.http.post<any>(
        'https://accept.paymob.com/api/acceptance/payment_keys',
        {
          auth_token: auth.token,
          amount_cents: amount * 100,
          expiration: 3600,
          order_id: order.id,
          billing_data: {
            apartment: 'NA',
            email,
            floor: 'NA',
            first_name: name,
            street: 'NA',
            building: 'NA',
            phone_number: phone,
            shipping_method: 'NA',
            postal_code: 'NA',
            city: 'NA',
            country: 'EG',
            last_name: name,
            state: 'NA'
          },
          currency: 'EGP',
          integration_id: this.integrationId
        }
      ).toPromise();

      // 4️⃣ Redirect to iframe
      const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${this.iframeId}?payment_token=${paymentKey.token}`;
      window.location.href = iframeUrl;
    } catch (error) {
      console.error('Paymob error:', error);
    }
  }
}
