import { Injectable, inject } from '@angular/core';
import { PRODUCT_QUERIES } from '@app/shared/graphql/products.queries';
import { HttpService } from '@app/core/http/services/http.service';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = `${environment.ApiEndpoint}`;

  getProducts(): Observable<Product[]> {
    const query = PRODUCT_QUERIES.GET_PRODUCTS;
    return this.httpService.post<any>(`${this.url}`, { query })
      .pipe(map((response) => response.data.getProductList.items))
  }

  getProductsByCategory(category: string, size?: number, id?: string): Observable<Product[]> {
    const query = PRODUCT_QUERIES.GET_PRODUCTS_BY_CATEGORY;
    const variables: any = {
      "where": {
        "category": {
          "title": { "eq": category }
        }
      }
    };
    if (size) variables.size = size;
    if (id) variables.where.NOT = { "_id": { "eq": id } }

    return this.httpService.post<any>(`${this.url}`, { query, variables })
      .pipe(map((response) => response.data.getProductList.items))
  }


  getProduct(productId: string): Observable<Product> {
    const query = PRODUCT_QUERIES.GET_PRODUCT;
    const variables = { _id: productId };
    return this.httpService.post<any>(`${this.url}`, { query, variables })
      .pipe(map((response) => response.data.getProduct))
  }
}
