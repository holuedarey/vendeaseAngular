import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { Constants } from '../common/constant';
import { StorageService } from '../_service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, public storage:StorageService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = this.authService.isAuthenticated();
    if (currentUser) {
      // authorised so return true
      this.router.navigate(['/dashboard']);
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.storage.clear(Constants.STORAGE_VARIABLES.TOKEN);
      this.router.navigate(['/login']);
      return false;
    }
  }

}
