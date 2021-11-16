import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient ) { }

  public baseUrl = environment.serverUrl 
  public token = localStorage.getItem('token_logic')

  createProduct(data: any): Observable <any>{ 
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    }) 
    return this.http.post<any>(`${this.baseUrl}/api/products/create`,{...data},{headers});
  }

  getAllProducts(user_id): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    }) 
    return this.http.get<any>(`${this.baseUrl}/api/products?user_id=${user_id}`,{headers})
  }

  getAllProductsAdmin(user_id): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    }) 
    return this.http.get<any>(`${this.baseUrl}/api/products/admin?user_id=${user_id}`,{headers})
  }
}
