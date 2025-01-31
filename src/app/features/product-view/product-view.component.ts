import { CurrencyPipe } from '@angular/common';
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
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SnackbarComponent } from '@app/shared/components/snackbar/snackbar.component';
import { Product } from '@app/shared/models/product.model';
import { environment } from '@env/environment';
import { CountdownComponent } from '../../shared/components/countdown/countdown.component';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { ProductsService } from './../../shared/services/products.service';
import { SnackbarData } from '@app/shared/models/snackbar-data.model';

@Component({
  imports: [
    CurrencyPipe,
    MatDividerModule,
    MatChipsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ProductGridComponent,
    CountdownComponent,
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent {
  private destroyRef = inject(DestroyRef);
  private productsService = inject(ProductsService);
  private snackBar = inject(MatSnackBar);
  productId: InputSignal<string> = input.required<string>();
  category: InputSignal<string> = input.required<string>();
  product: WritableSignal<Product | null> = signal<Product | null>(null);
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);
  imagePath: string = environment.ImgPath;

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      this.productsService
        .getProduct(this.productId())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((products) => {
          this.isLoading.set(false);
          this.product.set(products);
        });
      this.productsService
        .getProductsByCategory(this.category(), 3, this.productId())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((products) => {
          this.products.set(products);
        });
    });
  }

  addToCart(): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: { type: 'success', message: 'Product added to cart' }as SnackbarData,
    });
  }
}
