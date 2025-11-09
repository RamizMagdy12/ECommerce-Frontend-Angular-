import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { PageError } from './components/page-error/page-error';
import { Cart } from './components/cart/cart';
import { ProductDetails } from './components/product-details/product-details';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Payment } from './components/payment/payment';
import { WishList } from './components/wish-list/wish-list';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
    { path: '', component: ProductList, title: 'Product List' },
    { path: 'cart', component: Cart, title: 'Shopping Cart' },
    { path: 'product/:id', component: ProductDetails, title: 'Product Details' },
    { path: 'about', component: About, title: 'About Us' },
    { path: 'contact', component: Contact, title: 'Contact Us' },
    { path: 'payment', component: Payment, title: 'Payment' },
    { path: 'wishlist', component: WishList, title: 'Wish List' },
    { path: 'login', component: Login, title: 'Login' },
    { path: 'register', component: Register, title: 'Register' },
    { path: '**', component: PageError, title: '404' },

];
