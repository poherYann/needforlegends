import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {ToastrService} from "ngx-toastr";
@Injectable({
    providedIn: 'root'
  }
)
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router,private toaster:ToastrService) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      this.toaster.info("You need to be connected for this feature !");
      return false;
    }
    return true;
  }
}
