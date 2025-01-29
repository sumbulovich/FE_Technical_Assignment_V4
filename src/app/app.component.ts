import { BreakpointService } from './core/layout/services/breakpoint.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './shared/services/products.service';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatSidenavModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  breakpointService = inject(BreakpointService);
  isMobile = this.breakpointService.isMobile;
}
