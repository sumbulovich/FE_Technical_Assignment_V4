import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './shared/services/products.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FE_Technical_Assignment_V4';
  productsService = inject(ProductsService);

  constructor() {
    this.productsService.getProductsByCategory("7eefdc4c-449a-4e3d-a322-fdc9942bb713").subscribe((a) => {
      console.log(a)
    });
  }
}
