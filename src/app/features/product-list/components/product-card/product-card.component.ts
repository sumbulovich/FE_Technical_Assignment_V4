import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule, MatCardModule, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product: InputSignal<any> = input.required<any>();
}
