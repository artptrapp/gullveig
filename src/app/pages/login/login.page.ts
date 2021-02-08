import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string = ""
  private password: string = ""
  private loading: boolean = false
  private hasLoginError: boolean = false
  private loginMessage: string = ""

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController
  ) { }

  ionViewWillEnter() {
    this.menuController.enable(false)
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.hasLoginError = false;
    this.authService.loginWithUserAndPassword(this.username, this.password)
      .then((result) => {
        this.hasLoginError = !result.success;
        if (!result.success) {
          this.loginMessage = "Usuário ou senha inválidos"
        }
      })
      .catch((error) => {
        this.hasLoginError = true
        this.loginMessage = "Houve um erro ao fazer login"
      })
      .finally(() => {
        this.loading = false;
      })
  }

  goToRegister() {
    this.router.navigateByUrl('/register')
  }

}
