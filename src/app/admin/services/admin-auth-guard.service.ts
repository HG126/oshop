import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/switchmap';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth : AuthService, private userService : UserService) { }
  canActivate()
  {
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);

  }
}
