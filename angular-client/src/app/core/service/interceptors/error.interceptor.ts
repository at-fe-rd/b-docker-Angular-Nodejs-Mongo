
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private ns: NotificationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(error => {
          return this.errorHandler(error);
        })
      );
  }

  /**
   * Handle the error on the observable
   * @method errorHandler
   * @param  {any}        err Error information from failed request
   */
  errorHandler(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.auth.logout(true);
      } else if (err.status === 404) {
        // Not found
        this.auth.redirectTo('/error/404');
      } else if (err.status === 500) {
        const type = 'danger';
        const config: any = {
          type: type,
          msg: `Error 500`
        };
        this.ns.message(config);
      }
    }

    // Always give back the error for subscriber.
    return observableThrowError(err);
  }
}
