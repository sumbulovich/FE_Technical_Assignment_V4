import { inject, Injectable } from '@angular/core';
import { HttpService } from '@app/core/http/services/http.service';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { CATEGORIES_QUERIES } from '../graphql/categories.queries';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = `${environment.ApiEndpoint}`;

  getCategories(): Observable<Category[]> {
    const query = CATEGORIES_QUERIES.GET_CATEGORIES;
    return this.httpService
      .post<any>(`${this.url}`, { query })
      .pipe(map((response) => response.data.getCategoryList.items));
  }
}
