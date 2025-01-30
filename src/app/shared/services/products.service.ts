import { Injectable, inject } from '@angular/core';
import { PRODUCT_QUERIES } from '@app/shared/graphql/products.queries';
import { HttpService } from '@app/core/http/services/http.service';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = `${environment.ApiEndpoint}`;

  getProducts(): Observable<any> {
    const query = PRODUCT_QUERIES.GET_PRODUCTS;
    return this.httpService.post<any>(`${this.url}`, { query })
      .pipe(map((response: any) => response.data.getProductList.items))
  }

  getProductsByCategory(category: string): Observable<any> {
    const query = PRODUCT_QUERIES.GET_PRODUCTS_BY_CATEGORY;
    const variables = {
      where: {
        category: {
          title: { eq: category }
        }
      }
    };

    return this.httpService.post<any>(`${this.url}`, { query, variables })
      .pipe(map((response: any) => response.data.getProductList.items))
  }


  getProduct(productId: string): Observable<any> {
    const query = PRODUCT_QUERIES.GET_PRODUCT;
    const variables = { _id: productId };
    return this.httpService.post<any>(`${this.url}`, { query, variables })
      .pipe(map((response: any) => response.data.getProduct))
  }
}
