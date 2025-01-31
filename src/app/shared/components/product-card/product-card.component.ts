import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '@app/shared/models/product.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule, MatCardModule, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product: InputSignal<Product> = input.required<Product>();
  imagePath: string = environment.ImgPath;
}
