import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService){}

  canActivate(
    route: ActivatedRouteSnapshot): boolean{
      if(this.storageService.getToken()){ 
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}
