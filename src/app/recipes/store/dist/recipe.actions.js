"use strict";
exports.__esModule = true;
exports.SetRecipes = exports.DeleteRecipe = exports.UpdateRecipe = exports.AddRecipe = exports.SET_RECIPES = exports.DELETE_RECIPE = exports.UPDATE_RECIPE = exports.ADD_RECIPE = void 0;
exports.ADD_RECIPE = '[Recipes] Add Recipe';
exports.UPDATE_RECIPE = '[Recipes] Update Recipe';
exports.DELETE_RECIPE = '[Recipes] Delete Recipe';
exports.SET_RECIPES = '[Recipes] Set Recipes';
var AddRecipe = /** @class */ (function () {
    function AddRecipe(payload) {
        this.payload = payload;
        this.type = exports.ADD_RECIPE;
    }
    return AddRecipe;
}());
exports.AddRecipe = AddRecipe;
var UpdateRecipe = /** @class */ (function () {
    function UpdateRecipe(payload) {
        this.payload = payload;
        this.type = exports.UPDATE_RECIPE;
    }
    return UpdateRecipe;
}());
exports.UpdateRecipe = UpdateRecipe;
var DeleteRecipe = /** @class */ (function () {
    function DeleteRecipe() {
        this.type = exports.DELETE_RECIPE;
    }
    return DeleteRecipe;
}());
exports.DeleteRecipe = DeleteRecipe;
var SetRecipes = /** @class */ (function () {
    function SetRecipes(payload) {
        this.payload = payload;
        this.type = exports.SET_RECIPES;
    }
    return SetRecipes;
}());
exports.SetRecipes = SetRecipes;
