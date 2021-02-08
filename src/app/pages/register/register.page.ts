import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private username: string = ""
  private password: string = ""
  private passwordConfirmation: string = ""
  private loading: boolean = false
  private hasLoginError: boolean = false
  private loginErrors: string[] = []

  constructor(
    private authService: AuthService,
    private menuController: MenuController
  ) { }

  ionViewWillEnter() {
    this.menuController.enable(false)
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.hasLoginError = false;
    this.loginErrors = []
    this.authService.register(this.username, this.password, this.passwordConfirmation)
      .then((result) => {
        this.hasLoginError = !result.success;
        if (!result.success) {
          this.loginErrors = result.errors
        }
      })
      .catch((error) => {
        this.hasLoginError = true
        this.loginErrors = error
      })
      .finally(() => {
        this.loading = false;
      })
  }

}
