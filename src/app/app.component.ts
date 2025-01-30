import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { BreakpointService } from './core/layout/services/breakpoint.service';
import { SidenavComponent } from "./core/layout/components/sidenav/sidenav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, HeaderComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  breakpointService = inject(BreakpointService);
  isMobile = this.breakpointService.isMobile;
}
