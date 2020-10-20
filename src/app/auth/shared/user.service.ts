import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as moment from 'moment';

const jwtHelper = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = '';
  id: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private decodedToken: DecodedToken;
  redirectUrl: string = '';

  constructor(private http: HttpClient) {
    this.decodedToken = new DecodedToken();
  }

  register(formData: FormGroup): Observable<any> {
    return this.http.post<any>(`/api/v1/register`, formData.value).pipe(
      catchError((httpErr: HttpErrorResponse) => {
        return throwError([...[], httpErr.error]);
      })
    );
  }

  login(formData: FormGroup): Observable<any> {
    return this.http.post<any>('/api/v1/login', formData.value).pipe(
      map((token: string) => {
        this.saveToken(token);
        return token;
      }),
      catchError((httpErr: HttpErrorResponse) => {
        console.log(httpErr);
        return throwError([...[], httpErr?.error]);
      })
    );
  }

  logout() {
    localStorage.removeItem('app_booking_token');
    this.decodedToken = new DecodedToken();
  }

  checkAuthentication(): Boolean {
    const authToken = localStorage.getItem('app_booking_token');
    if (!authToken) return false;

    const decodedToken = jwtHelper.decodeToken(authToken);
    if (!decodedToken) return false;

    this.decodedToken = decodedToken;

    return true;
  }

  get username() {
    return this.decodedToken.username;
  }

  get isAuthenticated(): Boolean {
    const isAuth = moment(Date.now()).isBefore(this.getExpiration);
    return isAuth;
  }

  private async saveToken(token) {
    const decodedToken = await jwtHelper.decodeToken(token);

    if (!decodedToken) return null;

    this.decodedToken = decodedToken;
    localStorage.setItem('app_booking_token', token);
    return token;
  }

  private get getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }
}
