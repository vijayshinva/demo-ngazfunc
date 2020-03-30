import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Volcano } from './volcano';

@Injectable({
  providedIn: 'root'
})
export class VolcanoService {

  private volcanoApiUrl = 'http://localhost:7071/api/Volcano';

  constructor(private http: HttpClient) { }

  getVolcanoes(): Observable<Volcano[]> {
    return this.http.get<Volcano[]>(this.volcanoApiUrl)
      .pipe(
        catchError(this.handleError<Volcano[]>('getVolcanoes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
