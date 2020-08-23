"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthComponent = void 0;
var core_1 = require("@angular/core");
var alert_component_1 = require("../shared/alert/alert.component");
var placeholder_directive_1 = require("../shared/placeholder/placeholder.directive");
var AuthActions = require("./store/auth.actions");
var AuthComponent = /** @class */ (function () {
    function AuthComponent(componentFactoryResolver, store) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.store = store;
        this.isLoginMode = true;
        this.isLoading = false;
    }
    AuthComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select('auth').subscribe(function (authData) {
            _this.isLoading = authData.loading;
            if (authData.authMessage) {
                _this.showErrorAlert(authData.authMessage);
                _this.isLoading = false;
            }
        });
    };
    AuthComponent.prototype.onSwitchMode = function () {
        this.isLoginMode = !this.isLoginMode;
    };
    AuthComponent.prototype.onSubmit = function (form) {
        if (!form.valid) {
            return;
        }
        var email = form.value.email;
        var password = form.value.password;
        this.isLoading = true;
        if (this.isLoginMode) {
            this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
        }
        else {
            this.store.dispatch(new AuthActions.Signup({ email: email, password: password }));
        }
        form.reset();
    };
    AuthComponent.prototype.onHandleError = function () {
        this.store.dispatch(new AuthActions.ClearError());
    };
    AuthComponent.prototype.ngOnDestroy = function () {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    };
    AuthComponent.prototype.showErrorAlert = function (message) {
        var _this = this;
        // const alertCmp = new AlertComponent();
        var alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(alert_component_1.AlertComponent);
        var hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        var componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(function () {
            _this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    };
    __decorate([
        core_1.ViewChild(placeholder_directive_1.PlaceholderDirective, { static: false })
    ], AuthComponent.prototype, "alertHost");
    AuthComponent = __decorate([
        core_1.Component({
            selector: 'app-auth',
            templateUrl: './auth.component.html'
        })
    ], AuthComponent);
    return AuthComponent;
}());
exports.AuthComponent = AuthComponent;
