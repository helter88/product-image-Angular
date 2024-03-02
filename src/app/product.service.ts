import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductWithImage } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  addProduct(data: FormData) {
    return this.http.post('api/products', data);
  }

  getProduct(id: number) {
    return this.http.get<ProductWithImage>(`api/products/${id}`);
  }
}