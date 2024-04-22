import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseURL_v1 = `${environment.api.base}${environment.api.versions.v1}`;
  private apiUrl = this.baseURL_v1 + '/all?fields=name,capital,currencies,region,population,flag';
  constructor(private http: HttpClient) { }
  getCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
