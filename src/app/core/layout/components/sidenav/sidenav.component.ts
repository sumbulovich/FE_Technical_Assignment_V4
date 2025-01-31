import { CategoriesService } from './../../../../shared/services/categories.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from './../../../../shared/services/products.service';
import { Component, DestroyRef, inject, OnInit, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { Product } from '@app/shared/models/product.model';
import { Category } from '@app/shared/models/category.model';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterModule, KeyValuePipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private categoriesService = inject(CategoriesService);
  navigate: OutputEmitterRef<void> = output<void>();
  categories: WritableSignal<Category[]> = signal<Category[]>([]);

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((categories) => {
      this.categories.set(categories.sort((a, b) => a.title.localeCompare(b.title)));
    });
  }
}
