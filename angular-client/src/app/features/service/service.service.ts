import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../core/service/config/api.config';

const API_PATH = {
  team: 'fe.json',
  users: 'users',
  error: {
    err401: 'error/401',
    err404: 'error/404',
    err500: 'error/500'
  },
}

export interface User {
  name: string;
  age: number;
}

export interface Team {
  name?: string;
  established?: string;
  manager?: string;
  members?: number;
}

@Injectable()
export class ServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTeam(): Observable<Team> {
    return this.httpClient.get(`${API_BASE_URL}/${API_PATH.team}`).pipe(
      map((d: any) => d || {})
    );
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post(`${API_BASE_URL}/${API_PATH.users}`, user).pipe(
      map((d: any) => d || {})
    );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get(`${API_BASE_URL}/${API_PATH.users}`).pipe(
      map((d: any) => d || {})
    );
  }

  testError(code: string): Observable<any> {
    switch (code) {
      case '500':
        return this.httpClient.get(`${API_BASE_URL}/${API_PATH.error.err500}`);
      case '401':
        return this.httpClient.get(`${API_BASE_URL}/${API_PATH.error.err401}`);
      case '404':
        return this.httpClient.get(`${API_BASE_URL}/${API_PATH.error.err404}`);
    }
  }
}
