import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';

import { catchError, Observable, tap } from 'rxjs';
import { CityModel } from './city-model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
   
  cityUrl="https://localhost:7179/api/City";
  private cities: CityModel[]=[];
  constructor(private http: HttpClient) { }

  public getCities(): Observable<any>{
    return this.http.get<any>(`${this.cityUrl}`);
}

}
