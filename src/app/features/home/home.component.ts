import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Product } from '@app/shared/models/product.model';
import { ProductsService } from '@app/shared/services/products.service';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { MatListModule } from '@angular/material/list';
import { KeyValuePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreakpointService } from '@app/core/layout/services/breakpoint.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  imports: [
    ProductGridComponent,
    MatToolbarModule,
    MatListModule,
    KeyValuePipe,
    RouterLink,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private productsService = inject(ProductsService);
  private breakpointService = inject(BreakpointService);
  isMobile = this.breakpointService.isMobile;
  navigate: OutputEmitterRef<void> = output<void>();
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  categoriesCount: WritableSignal<Record<string, number>> = signal<
    Record<string, number>
  >({});
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => {
        this.isLoading.set(false);
        this.products.set(products);
        this.categoriesCount.set(this.getCategoriesWithCounts(products));
      });
  }

  private getCategoriesWithCounts(products: Product[]): Record<string, number> {
    const categoryCounts: Record<string, number> = {};

    products.forEach((product) => {
      const category = product.category?.title;
      if (!category) return;
      if (categoryCounts[category]) categoryCounts[category]++;
      else categoryCounts[category] = 1;
    });

    return categoryCounts;
  }
}
