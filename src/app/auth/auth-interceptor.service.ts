import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, take } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      exhaustMap((auth) => {
        if (!auth.user) {
          return next.handle(req);
        }
        const token = auth.user['_token'];
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', token),
        });
        return next.handle(modifiedReq);
      }),
    );
  }
}
