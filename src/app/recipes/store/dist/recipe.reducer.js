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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.recipeReducer = void 0;
var fromRecipeActions = require("./recipe.actions");
var initialState = {
    recipes: [],
    editedRecipes: null,
    editedRecipesIndex: -1
};
function recipeReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case fromRecipeActions.ADD_RECIPE:
            return __assign(__assign({}, state), { recipes: __spreadArrays(state.recipes, [action.payload]) });
        case fromRecipeActions.SET_RECIPES:
            return __assign(__assign({}, state), { recipes: __spreadArrays(action.payload) });
        default:
            return state;
    }
}
exports.recipeReducer = recipeReducer;
