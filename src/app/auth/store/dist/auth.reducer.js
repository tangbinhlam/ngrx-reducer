"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.authReducer = void 0;
var user_model_1 = require("../user.model");
var fromAuthActions = require("./auth.actions");
var initialState = {
    user: null,
    authMessage: null,
    loading: false
};
function authReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case fromAuthActions.LOGIN:
            var user = new user_model_1.User(action.payLoad.email, action.payLoad.userId, action.payLoad.token, action.payLoad.expirationDate);
            return __assign(__assign({}, state), { user: user, loading: false });
        case fromAuthActions.LOGOUT:
            return __assign(__assign({}, state), { user: null });
        case fromAuthActions.LOGIN_START:
        case fromAuthActions.SIGN_UP:
            return __assign(__assign({}, state), { authMessage: null, loading: true });
        case fromAuthActions.LOGIN_FAIL:
            return __assign(__assign({}, state), { user: null, authMessage: action.payload, loading: false });
        case fromAuthActions.CLEAR_ERROR:
            return __assign(__assign({}, state), { authMessage: null });
        default:
            return state;
    }
}
exports.authReducer = authReducer;
