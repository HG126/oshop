import { UserService } from 'shared/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.default.User>;


  constructor(private userService : UserService,  private afAuth : AngularFireAuth, private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }
  login()
  {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider())
  }

  logout()
  {
    this.afAuth.signOut();
  }

  get appUser$()
  {
    return this.user$
    .switchMap(user => {
      if(user) return this.userService.get(user.uid).valueChanges();

      return Observable.of(null);
    });
  }
}
