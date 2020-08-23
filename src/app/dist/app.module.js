"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var effects_1 = require("@ngrx/effects");
var router_store_1 = require("@ngrx/router-store");
var store_1 = require("@ngrx/store");
var fromDevTool = require("@ngrx/store-devtools");
var environment_1 = require("src/environments/environment");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var auth_effects_1 = require("./auth/store/auth.effects");
var core_module_1 = require("./core.module");
var header_component_1 = require("./header/header.component");
var shared_module_1 = require("./shared/shared.module");
var app_reducer_1 = require("./store/app.reducer");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, header_component_1.HeaderComponent],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                shared_module_1.SharedModule,
                core_module_1.CoreModule,
                store_1.StoreModule.forRoot(app_reducer_1.appReducer),
                effects_1.EffectsModule.forRoot([auth_effects_1.AuthEffects]),
                !environment_1.environment.production ? fromDevTool.StoreDevtoolsModule.instrument() : [],
                router_store_1.StoreRouterConnectingModule.forRoot(),
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
