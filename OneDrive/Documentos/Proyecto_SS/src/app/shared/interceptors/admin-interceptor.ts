import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  // Aquí lo que estamos realizando es, que se intercepten las acciones de usuario, para generar un buen funcionameniento de la API:
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('users')) {
      const userValue = this.authSvc.userValue;
      const authReq = req.clone({
        setHeaders: {
          auth: userValue.token,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
