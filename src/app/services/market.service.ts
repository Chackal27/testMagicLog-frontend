import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient ) { }

  public baseUrl = environment.serverUrl 

  getAllProducts(data): Observable<any>{
    
    return this.http.get<any>(`${this.baseUrl}/api/market?nombre=${data.nombre}&sku=${data.sku}&precio1=${data.precio1}&precio2=${data.precio2}`)
  }
}
