import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {
    auth.onAuthStateChanged(user => {
      if (!user) {
        return
      }

      this.router.navigateByUrl('/home')
    })
  }

  changeCharacter() {
    this.router.navigateByUrl('/home')
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigateByUrl('/'))
  }
}
