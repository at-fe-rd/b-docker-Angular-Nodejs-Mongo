import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../config/api.config';

const API_PATH = {
  login: 'login',
  logout: 'logout'
};
export interface LoginData {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {

  private logger = new Subject<boolean>();
  cachedRequests: Array<HttpRequest<any>> = [];
  referralRoute: string;
  jwtHelper = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  authenticator(): Observable<boolean> {
    return this.logger.asObservable();
  }

  setToken(jwt: string): void {
    localStorage.setItem('token', jwt);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(loginData: LoginData): Observable<any> {

    /**
     * Replace `of()` with an actual login request
     * ex:
     * ```js
     * this.httpClient.post(`${API_BASE_URL}${API_PATH.login}`, loginData)
     * ```
     */
    return of({
      // tslint:disable-next-line:max-line-length
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEdW1teSB0b2tlbiIsImlhdCI6MTUwNzcwNTcwNCwiZXhwIjoxNTcwNzc3NzA0LCJhdWQiOiJhc2lhbnRlY2gudm4iLCJzdWIiOiJ0ZWFtLmZlQGFzaWFudGVjaC52biIsImF1dGhvciI6IkFUIEZyb250IEVuZCBUZWFtIiwiZW1haWwiOiJ0ZWFtLmZlQGFzaWFudGVjaC52biJ9.UsXvYEkACyavwqpsxjxKqb2FSAh4tfXoLDKrNIKG8J0'
    })
    .pipe(
      map((data: any) => {
        this.logger.next(true);
        this.redirectToPrevStep();
        this.setToken(data.access_token);
      })
    );
  }

  logout(preserveRoute: boolean = false) {
    localStorage.removeItem('token');
    this.logger.next(false);
    this.redirectToLogin(preserveRoute ? this.router.url : '/');
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    let isAuthenticated: boolean;
    if (this.isTokenInvalid() || this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
      isAuthenticated = false;
    } else {
      isAuthenticated = true;
    }
    return isAuthenticated;
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    const userInfo = this.jwtHelper.decodeToken(token);
    return userInfo || {};
    // console.log(
    //   this.jwtHelper.decodeToken(token),
    //   this.jwtHelper.getTokenExpirationDate(token),
    //   this.jwtHelper.isTokenExpired(token)
    // );
  }


  isTokenInvalid() {
    const token = localStorage.getItem('token');
    if (!token) {
      return true
    } else {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return true
      }
    }
    return false;
  }

  /**
   * Helper method for set up referral route, enable useful redirect after login
   * @method setRoute
   * @param  {string} route Route as defined in app.routes, eg. /user/1
   */
  setRoute(route: string): void {
    this.referralRoute = route;
  }

  redirectToPrevStep() {
    const route = this.referralRoute ? this.referralRoute : '/';
    this.router.navigateByUrl(route);
  }

  redirectToLogin(current: string = '/') {
    // Store current url as referral and use latter for login redirection
    this.setRoute(current);
    this.router.navigate(['/auth/login']);
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
