import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Url } from '../model/url';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  serverUrl = '//localhost:8080';

  constructor(private http: HttpClient) { }

  findById(id: number | string): Observable<Url> {
    return this.http.get<Url>(this.serverUrl + '/getById?id=' + id)
      .pipe(retry(1),catchError(this.handleError));
  }

  save(url: string): Observable<Url> {
    return this.http.post<Url>(this.serverUrl + '/save?originalUrl=' + url, {})
      .pipe(retry(1),catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = `Error: ${error.error.message}`;

    window.alert(errorMessage);
    
    return throwError(errorMessage);
  }
}
