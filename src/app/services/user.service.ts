import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) { }

  public baseUrl = environment.serverUrl 

  createUser(data: any): Observable <any>{  
    return this.http.post<any>(`${this.baseUrl}/api/users/create`,{...data});
  }

  getAllSellers(): Observable <any>{  
    return this.http.get<any>(`${this.baseUrl}/api/users/`);
  }
}
