import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CountryItemComponent} from "../../../shared/components/country-item.component";
import { CountriesService } from "../../../services/countries.service";
import {environment} from "../../../environments/environment";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../services/auth.service";

type UserAccess = {
  read: boolean;
  write: boolean;
}

@Component({
  selector: 'app-country-list',
  imports: [CountryItemComponent, ScrollingModule, CommonModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  standalone: true,
  template: `
    <div class="app-country-list">
      <h1>Country list</h1>
        <cdk-virtual-scroll-viewport itemSize="50" class="virtual-scroll-container">
          <app-country-item
            *cdkVirtualFor="let country of countries; let i = index"
            [flag]="country.flag"
            [userHasAccessDelete]="userHasAccessDelete"
            [userHasAccessDetails]="userHasAccessDetails"
            [countryData]="country">
          </app-country-item>
        </cdk-virtual-scroll-viewport>
    </div>
  `,
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit{
  countries: any[] = [];
  flagUrl: string = environment.flagUrl;
  userHasAccessDelete!: UserAccess;
  userHasAccessDetails: UserAccess = { read: true, write: true };

  constructor(private countriesService: CountriesService, private authService: AuthService) {}
  ngOnInit(): void {
    this.getCountries();
    this.userHasAccessDelete = this.authService.hasRole('admin')
      ? { read: true, write: true}
      : { read: false, write: false };
  }
  getCountries(): void {
    this.countriesService.getCountries().subscribe(
      data => {
        this.countries = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  getFlagUrl(flag:string):string {
    return (this.flagUrl + '/' + flag + '.svg').toLowerCase();
  }
  protected readonly Object = Object;
}
