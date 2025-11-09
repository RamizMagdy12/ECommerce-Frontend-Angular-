import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = 'https://dummyjson.com/products';
  constructor(private http:HttpClient) { }
  // get all products
  getAllProducts():Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}`);
  }
  // get product by id Details
  getProductById(id:number):Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }
  // add new product
  addProduct(newproduct:IProduct):Observable<IProduct> {
    return this.http.post<IProduct>(`${this.baseUrl}`, newproduct);
  }
  // update product
  updateProduct(id:number, product:IProduct):Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseUrl}/${id}`, product);
  }
  // delete product
  deleteProduct(id:number):Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
 getAllCategories(): Observable<string[]> {
  return this.http.get<any[]>(`${this.baseUrl}/categories`).pipe(
    // ناخد الاسم فقط
    map(categories => categories.map(cat => cat.slug ?? cat.name)),
    // نفلتر اللي فيهم منتجات فعلاً
    switchMap(categories => {
      const requests = categories.map(cat =>
        this.http.get<any>(`${this.baseUrl}/category/${cat}`).pipe(
          map(res => ({ name: cat, hasProducts: res.products.length > 0 }))
        )
      );
      return forkJoin(requests);
    }),
    // نرجع فقط اللي ليهم منتجات
    map(results => results.filter(r => r.hasProducts).map(r => r.name))
  );
}
getProductsByCategory(category: string): Observable<IProduct[]> {
  return this.http.get<any>(`${this.baseUrl}/category/${category}`).pipe(
    map(res => res.products)
  );
}
}

