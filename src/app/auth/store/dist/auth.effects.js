"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var AuthActions = require("./auth.actions");
var AuthEffects = /** @class */ (function () {
    function AuthEffects(actions$, http, router) {
        var _this = this;
        this.actions$ = actions$;
        this.http = http;
        this.router = router;
        this.authSignup = this.actions$.pipe(effects_1.ofType(AuthActions.SIGN_UP), operators_1.switchMap(function (authData) {
            return _this.http
                .post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
                environment_1.environment.firebaseAPIKey, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            })
                .pipe(operators_1.map(function (resData) {
                return _this.handleAuthentication(resData);
            }), operators_1.catchError(_this.handleError));
        }));
        this.authLogin = this.actions$.pipe(effects_1.ofType(AuthActions.LOGIN_START), operators_1.switchMap(function (authData) {
            return _this.http
                .post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
                environment_1.environment.firebaseAPIKey, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            })
                .pipe(operators_1.map(function (resData) {
                return _this.handleAuthentication(resData);
            }), operators_1.catchError(_this.handleError));
        }));
        this.authSuccess = this.actions$.pipe(effects_1.ofType(AuthActions.LOGIN), operators_1.tap(function () {
            _this.router.navigate(['/recipes']);
        }));
    }
    AuthEffects.prototype.handleAuthentication = function (resData) {
        var expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        return new AuthActions.Login({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate: expirationDate
        });
    };
    AuthEffects.prototype.handleError = function (errorRes) {
        var errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return rxjs_1.of(new AuthActions.LoginFail(errorMessage));
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
        }
        return rxjs_1.of(new AuthActions.LoginFail(errorMessage));
    };
    __decorate([
        effects_1.Effect()
    ], AuthEffects.prototype, "authSignup");
    __decorate([
        effects_1.Effect()
    ], AuthEffects.prototype, "authLogin");
    __decorate([
        effects_1.Effect({ dispatch: false })
    ], AuthEffects.prototype, "authSuccess");
    AuthEffects = __decorate([
        core_1.Injectable()
    ], AuthEffects);
    return AuthEffects;
}());
exports.AuthEffects = AuthEffects;
