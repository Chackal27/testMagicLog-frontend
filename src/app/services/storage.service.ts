import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getToken():boolean{
    if(localStorage.getItem('token_logic') != null){
      return true
    }
    return false
  }

  flushToken(){
    localStorage.removeItem('token_logic')
    localStorage.removeItem('user_info')
  }
}
