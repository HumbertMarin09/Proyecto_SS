import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
@Injectable()
export class FormInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('forms')) {
      const formValue = this.authSvc.userValue;
      const authReq = req.clone({
        setHeaders: {
          auth: formValue.token,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
