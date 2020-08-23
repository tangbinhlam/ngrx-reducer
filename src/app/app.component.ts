import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as formApp from './store/app.reducer';
import { LoggingService } from './logging.service';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<formApp.AppState>,
    private loggingService: LoggingService,
  ) {}

  ngOnInit() {
    //this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
