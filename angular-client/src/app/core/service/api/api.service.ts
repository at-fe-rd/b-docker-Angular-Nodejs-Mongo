
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';
import { Observable } from 'rxjs';

export { END_POINT } from '../../../config/api.config';
import { environment } from 'environments/environment';
export const API_BASE_URL = `${environment.apiBaseUrl}/api`;

function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

const ResponseType = strEnum([
  'arraybuffer', 'blob', 'json', 'text'
]);

export type ResponseType = keyof typeof ResponseType;

export interface RequestOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: HttpObserve;
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: ResponseType;
  withCredentials?: boolean;
}

export interface CustomReqOptions extends RequestOptions {
  observe?: 'body';
  responseType?: 'json';
}

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * perform http get request, return observable of empty string if error.
   * Please notice that the errors was already handled in the interceptor.
   * @param endpoint
   */
  get(endpoint: string, options?: CustomReqOptions): Observable<Object> {
    return this.http.get(`${API_BASE_URL}/${endpoint}`, options);
  }

  /**
   * Perform a http post request
   * @param endpoint
   * @param data The body of the request
   */
  post(endpoint: string, data: any, options?: CustomReqOptions): Observable<Object> {
    return this.http.post(`${API_BASE_URL}/${endpoint}`, data, options);
  }

  /**
   * Perform a http put request
   * @param endpoint
   * @param data The body of the request
   */
  put(endpoint: string, data: any, options?: CustomReqOptions): Observable<Object> {
    return this.http.put(`${API_BASE_URL}/${endpoint}`, data, options);
  }

  delete(endpoint: string, id: string | number, options?: CustomReqOptions): Observable<string | Object> {
    return this.http.delete(`${API_BASE_URL}/${endpoint}/${id}`, options);
  }
}
