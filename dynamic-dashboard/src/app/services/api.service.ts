import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { defaultHttpOptions } from '../../utils/chart/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

	/**
	 * Makes a GET request using default HTTP options.
	 * @param url The target URL to make GET request to.
	 * @returns Observable
	 */
	httpGet(url: string): Observable<any> {
		return this.http.get<Response>(url).pipe(
			map(res => res),
			catchError(err => this._handleError(err))
		);
	}

  getDashboard(): Observable<any> {
    return this.httpGet('http://localhost:5000/dashboard')
  }

 /**
	 * Throws an error to the API caller.
	 * @param error The error response object
	 */
 private _handleError(error: Response) {
  if (error.status === 0 || error.statusText === 'Unknown Error') {
    return throwError(() => ({ message: 'Check your network connection and try again' }));
  }
  return throwError(() => {
    return { statusCode: error.status } || { message: 'Check your network connection and try again' };
  });
}

}
