import { UserResponse } from '../models/user.interface';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}

  // Con esto lo que haremos es un proceso contrareo, normalmente se usaría para permitir un acceso, aquí, le diremos que si ya accedio, debe prohibirle regresar al login:
  canActivate(): Observable<boolean> {
    // Esto es un refactor:
    return this.authSvc.user$.pipe(
      take(1),
      map((user: UserResponse) => (!user ? true : false))
    );
  }
}