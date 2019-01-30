
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of as observableOf,  Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * perform http get request
   * @param endpoint
   */
  get(endpoint: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.http.get(`${API_BASE_URL}/${endpoint}`, options);
  }

  /**
   * Perform a http post request
   * @param endpoint
   * @param data The body of the request
   */
  post(endpoint: string, data: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.http.post(`${API_BASE_URL}/${endpoint}`, data, options);
  }

  /**
   * Perform a http put request
   * @param endpoint
   * @param data The body of the request
   */
  put(endpoint: string, data: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.http.put(`${API_BASE_URL}/${endpoint}`, data, options);
  }

  delete(endpoint: string, id: string | number, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<string | Object> {
    return this.http.delete(`${API_BASE_URL}/${endpoint}/${id}`, options);
  }
}
