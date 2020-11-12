import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHeaders,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Interceptor implements HttpInterceptor {
  intercept = (
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> => {
    if (request.url.includes('api.tomtom.com')) {
      return next.handle(request);
    }

    const token = this.token;
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request);
  };

  get token(): string {
    return localStorage.getItem('app_booking_token');
  }
}
