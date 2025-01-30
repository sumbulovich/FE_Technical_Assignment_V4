import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from './../../shared/services/products.service';
import { Component, DestroyRef, effect, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';

@Component({
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {
  private destroyRef = inject(DestroyRef)
  private productsService = inject(ProductsService);
  productId: InputSignal<string> = input.required<string>();
  product: WritableSignal<any> = signal<any>({});

  constructor() {
    effect(() => {
      this.productsService.getProduct(this.productId())
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((products) => {
          this.product.set(products);
        });
    })
  }
}
