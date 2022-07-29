import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { UserResponse, User } from '@shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService(); // Declaramos el helper para la verificación del token
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<UserResponse>(null!); // Haremos un refactor que llevará todo los datos como token, validación de usuario, etc.

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken(); // Mandamos a llamar este método, para siempre que se ejecute el server.
  }

  // Refactorizamos todas las funciones pasadas para que todo se haga directo en el usuario:
  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  // Mismo caso anterior, refactorizamos para que todo actue sobre las acciones de usuario:
  get userValue(): UserResponse {
    return this.user.getValue();
  }

  // Método para las funciones del login:
  login(authData: User): Observable<UserResponse | void> {
    // Lo que estamos generando aquí es, que cuando se entre al login, haya una vinculación con la liga que contiene los datos de la base de datos, y que realice una validación de usuario:
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user); // Aquí es donde mandamos a gurdar el Token, una vez que accedemos.
          this.user.next(user); // Se jala el refactorizaje para usar los valores pasados, como el token, el rol o comprobar si esta loggeado, pero sin tanto código.
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  chPassword(user: User): Observable<User> {
    return this.http
      .post<User>(`${environment.API_URL}/auth/change-password`, user)
      .pipe(catchError(this.handlerError));
  }

  // Método para la función del logout:
  logout(): void {
    localStorage.removeItem('user'); // Solo le decimos que elimine el item "users" cuando salga.
    this.user.next(null!); // Se usa un refactorizaje para pasar todo a null.
    this.router.navigate(['/login']); // Le estamos diciendo, que si se desloggea, lo redirija de regreso al login, en vez de a home.
  }

  // Este método valida el Token en el acceso, y también nos permite almacenar al usuario, una vez se cierra la aplicación:
  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')!) || null; // Creamos el método para que obtenga el usuario, y generé el token.

    // Generamos una comparación, para revisar si el usuario existe, y si esta fuera, pues regresará que esta expirado.
    if (user) {
      const isExpired = helper.isTokenExpired(user.token); // Creamos la identificación del token expirado.

      // Aquí comprobamos si el usuario/token está expirado:
      if (isExpired) {
        this.logout(); // Sí si, es que esta desloggeado.
      } else {
        // Si no, hará una comprobación de que está loggeado, y va identificar su rol, y el token de usuario.
        this.user.next(user);
      }
    }
  }

  // Método para almacenar internamente el usuario y el token:
  private saveLocalStorage(user: UserResponse): void {
    // localStorage.setItem('token', token);
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  // Método que arrojará errores:
  private handlerError(err: any): Observable<never> {
    let errorMessage = 'Ha ocurrido un error al recibir la información.';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
