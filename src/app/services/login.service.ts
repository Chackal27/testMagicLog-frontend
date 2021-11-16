import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient ) { }

  public baseUrl = environment.serverUrl 

  login(data: any): Observable <any>{  
    return this.http.post<any>(`${this.baseUrl}/api/login`,{email: data.email, password: data.password});
  }
}
