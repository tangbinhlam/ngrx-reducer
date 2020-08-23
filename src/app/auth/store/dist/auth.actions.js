"use strict";
exports.__esModule = true;
exports.LoginFail = exports.LoginStart = exports.Logout = exports.Signup = exports.Login = exports.SIGN_UP = exports.LOGOUT = exports.LOGIN = exports.LOGIN_FAIL = exports.LOGIN_START = void 0;
exports.LOGIN_START = '[Auth] Login Start';
exports.LOGIN_FAIL = '[Auth] Login Fail';
exports.LOGIN = '[Auth] Login';
exports.LOGOUT = '[Auth] Logout';
exports.SIGN_UP = '[Auth] Sign Up';
var Login = /** @class */ (function () {
    function Login(payLoad) {
        this.payLoad = payLoad;
        this.type = exports.LOGIN;
    }
    return Login;
}());
exports.Login = Login;
var Signup = /** @class */ (function () {
    function Signup(payload) {
        this.payload = payload;
        this.type = exports.SIGN_UP;
    }
    return Signup;
}());
exports.Signup = Signup;
var Logout = /** @class */ (function () {
    function Logout() {
        this.type = exports.LOGOUT;
    }
    return Logout;
}());
exports.Logout = Logout;
var LoginStart = /** @class */ (function () {
    function LoginStart(payload) {
        this.payload = payload;
        this.type = exports.LOGIN_START;
    }
    return LoginStart;
}());
exports.LoginStart = LoginStart;
var LoginFail = /** @class */ (function () {
    function LoginFail(payload) {
        this.payload = payload;
        this.type = exports.LOGIN_FAIL;
    }
    return LoginFail;
}());
exports.LoginFail = LoginFail;
