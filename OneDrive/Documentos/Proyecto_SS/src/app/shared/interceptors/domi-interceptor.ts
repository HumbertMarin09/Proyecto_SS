import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
@Injectable()
export class DomiInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('domicilios')) {
      const domiValue = this.authSvc.userValue;
      const authReq = req.clone({
        setHeaders: {
          auth: domiValue.token,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
