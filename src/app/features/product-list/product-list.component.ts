import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '@app/shared/models/product.model';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  imports: [MatProgressSpinnerModule, ProductGridComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private destroyRef = inject(DestroyRef);
  private productsService = inject(ProductsService);
  category: InputSignal<string> = input.required<string>();
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      this.productsService
        .getProductsByCategory(this.category())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((products) => {
          this.products.set(products);
          this.isLoading.set(false);
        });
    });
  }
}
