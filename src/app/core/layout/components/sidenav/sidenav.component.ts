import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from './../../../../shared/services/products.service';
import { Component, DestroyRef, inject, OnInit, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterModule, KeyValuePipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private productsService = inject(ProductsService);
  navigate: OutputEmitterRef<void> = output<void>();
  categoriesCount: WritableSignal<Record<string, number>> = signal<Record<string, number>>({});

  ngOnInit(): void {
    this.productsService.getProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((products) => {
      this.categoriesCount.set(this.getCategoriesWithCounts(products));
    });
  }

  private getCategoriesWithCounts(products: any[]): Record<string, number> {
    const categoryCounts: Record<string, number> = {};

    products.forEach(product => {
      const category = product.category.title;
      if (categoryCounts[category]) categoryCounts[category]++;
      else categoryCounts[category] = 1;
    });

    return categoryCounts
  }
}
