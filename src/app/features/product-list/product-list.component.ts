import { ProductsService } from '../../shared/services/products.service';
import { Component, DestroyRef, effect, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private destroyRef = inject(DestroyRef)
  private productsService = inject(ProductsService);
  category: InputSignal<string> = input.required<string>();
  products: WritableSignal<any[]> = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.productsService.getProductsByCategory(this.category())
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((products) => {
          this.products.set(products);
        });
    })
  }
}
