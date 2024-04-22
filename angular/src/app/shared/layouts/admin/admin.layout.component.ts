import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  template: `
    <!-- dashboard.component.html -->
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport="true" [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"  [opened]="true" [mode]="(isHandset$ | async) ? 'over' : 'side'">
        <div>
          <img src="assets/img/img.png" height="30" alt="Logo"/>
          <mat-nav-list>
            <a mat-list-item [routerLink]="['/']"> Countries 🐵</a>
            <a mat-list-item *ngIf="auth.hasRole('admin')" [routerLink]="['admin']"> Admin Page </a>
            <a mat-list-item [routerLink]="['operator']"> Operator Page </a>
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
            <mat-icon (click)="drawer.toggle()" aria-label="Side nav toggle icon">menu</mat-icon>
            <span class="spacer"></span>
            <button (click)="logout()" mat-button > Log Out </button>
        </mat-toolbar>
          <main class="content-main">
            <mat-grid-list cols="4" rowHeight="100px">
              <mat-grid-tile
                [colspan]="2"
                [rowspan]="1"
                [style.background]="'#DDBDF1'">
                &hearts;  Here can be real time some component that needs to be always  🐵 displayed &hearts;
              </mat-grid-tile>
              <mat-grid-tile
                [colspan]="2"
                [rowspan]="1"
                [style.background]="'#DDBDF1'">
                &hearts; and here another 🐵 one &hearts;
              </mat-grid-tile>
            </mat-grid-list>
            <router-outlet> </router-outlet>
          </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: 'admin.layout.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule
  ],
})
export class AdminLayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver, protected auth: AuthService) {

  }
  logout() {
    this.auth.logout();
    window.location.reload()
  }
}
