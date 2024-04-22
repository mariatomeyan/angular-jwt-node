import {Component, OnInit, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from "@angular/common";
import { RouterModule } from '@angular/router';

interface UserAccess {
  read: boolean;
  write: boolean;
}

@Component({
  selector: 'app-country-item',
  standalone: true,
  template: `
    <mat-card class="country-card">
      <mat-card-header>
        <div mat-card-avatar class="example-header-image">
          {{ flag }}
        </div>
        <mat-card-title>{{ countryData.name.common }}</mat-card-title>
        <mat-card-subtitle>{{ countryData.capital[0] }}</mat-card-subtitle>
      </mat-card-header>
       <mat-card-content>
         <p>
            <small> <strong> Population : {{ countryData.population }} </strong> </small>
         </p>
      </mat-card-content>
      <mat-card-actions>
        <button *ngIf="userHasAccessDelete.read && userHasAccessDelete.write" mat-button color="warn"> Delete </button>
        <button *ngIf="userHasAccessDetails.read || userHasAccessDetails.write" mat-button color="primary" [routerLink]="['/']"> Details </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./country-item.component.scss'],
  imports:[MatButtonModule, MatCardModule, CommonModule, RouterModule]
})
export class CountryItemComponent implements OnInit{
  @Input() countryData: any;
  @Input() flag: any;
  @Input() userHasAccessDelete: any;
  @Input() userHasAccessDetails: any;

  ngOnInit() {
  }
}
