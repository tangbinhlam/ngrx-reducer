"use strict";
exports.__esModule = true;
exports.appReducer = void 0;
var fromAuth = require("../auth/store/auth.reducer");
var fromShopping = require("../shopping-list/store/shopping-list.reducer");
var fromRecipes = require("../recipes/store/recipe.reducer");
exports.appReducer = {
    shoppingList: fromShopping.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
};
