import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

export type AuthResult = {
  success: boolean,
  message: string
}

export type RegisterResult = {
  success: boolean,
  errors: string[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authService: AngularFireAuth
  ) { }

  async loginWithUserAndPassword(username: string, password: string): Promise<AuthResult> {
    const login = `${username}@gullveig.com`;
    try {
      const result = await this.authService.signInWithEmailAndPassword(login, password)
      return {
        success: true,
        message: `Bem-vindo (a), ${result.user.displayName}`
      }
    } catch (e) {
      return {
        success: false,
        message: e ? e.message : 'Falha ao logar, verifique o nome de usuário e a senha.'
      }
    }
  }

  async register(username: string, password: string, passwordConfirmation: string): Promise<RegisterResult> {

    const errors = []
    if (!username || username.length > 12 || username.length < 4) {
      errors.push('Nome de usuário é obrigatório e deve ter entre 4 e 12 caracteres.')
    }

    if (!password || password != passwordConfirmation || password.length < 6) {
      errors.push('Senhas devem ser preenchidas e iguais, com no mínimo 6 caracteres.')
    }

    if (errors.length) {
      return {
        success: false,
        errors
      }
    }
    const login = `${username}@gullveig.com`;
    try {
      const result = await this.authService.createUserWithEmailAndPassword(login, password)
      return {
        success: true,
        errors: []
      }
    } catch (e) {
      return {
        success: false,
        errors: ['Houve um erro ao registrar, tente novamente mais tarde']
      }
    }
  }
}
