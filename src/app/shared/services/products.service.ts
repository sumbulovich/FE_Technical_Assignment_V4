import { Injectable, inject } from '@angular/core';
import { PRODUCT_QUERIES } from '@app/shared/graphql/products.queries';
import { HttpService } from '@app/core/http/services/http.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = `${environment.ApiEndpoint}`;

  getProducts(): Observable<any> {
    const query = PRODUCT_QUERIES.GET_PRODUCTS_BY_CATEGORY;
    return this.httpService.post<any>(`${this.url}`, { query })
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    const query = PRODUCT_QUERIES.GET_PRODUCTS_BY_CATEGORY;

    const variables = {
      where: {
        category: {
          _id: { eq: categoryId }
        }
      }
    };

    return this.httpService.post<any>(`${this.url}`, { query, variables })
  }


  addProduct(product: any): Observable<any> {
    return this.httpService.put<any>(`${this.url}`, product)
  }

  deleteProduct(productId: any): Observable<any> {
    return this.httpService.delete<any>(`${this.url}/${productId}`)
  }
}
