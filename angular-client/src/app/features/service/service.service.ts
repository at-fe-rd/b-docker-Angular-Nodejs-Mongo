import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { END_POINT } from '../../core/service/config/api.config';
import { ApiService } from '../../core/service/api/api.service';

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
    private api: ApiService
  ) { }

  getTeam(): Observable<Team> {
    return this.api.get(END_POINT.team).pipe(
      map((d: any) => d || {})
    );
  }

  addUser(user: User): Observable<User> {
    return this.api.post(END_POINT.users, user).pipe(
      map((d: any) => d || {})
    );
  }

  getUsers(): Observable<User[]> {
    return this.api.get(END_POINT.users).pipe(
      map((d: any) => d || {})
    );
  }
}
