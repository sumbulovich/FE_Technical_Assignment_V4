import { Component, input, InputSignal } from '@angular/core';
import { Product } from '@app/shared/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
})
export class ProductGridComponent {
  products: InputSignal<Product[]> = input.required<Product[]>();
}
