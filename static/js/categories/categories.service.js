"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('../global/rxjs-operators.js');
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var Observable_1 = require('rxjs/Observable');
var CategoriesService = (function () {
    function CategoriesService(http) {
        this.http = http;
        this.lastId = 0;
        this.categories = [];
        this.categoriesUrl = '/backoffice/categories/data';
        this.categoriesDeleteUrl = '/backoffice/categories/delete';
    }
    CategoriesService.prototype.addCategory = function (category) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(category);
        return this.http.put(this.categoriesUrl, body, options)
            .map(this.updateCategoriesData)
            .catch(this.handleError);
    };
    CategoriesService.prototype.updateCategory = function (category) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(category);
        return this.http.post(this.categoriesUrl, body, options)
            .map(this.updateCategoriesData)
            .catch(this.handleError);
    };
    CategoriesService.prototype.deleteCategories = function (ids) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(ids);
        return this.http.post(this.categoriesDeleteUrl, body, options)
            .map(this.updateCategoriesData)
            .catch(this.handleError);
    };
    CategoriesService.prototype.getAllCategories = function () {
        return this.http.get(this.categoriesUrl)
            .map(this.extractCategoriesData)
            .catch(this.handleError);
    };
    CategoriesService.prototype.updateCategoriesData = function (res) {
        var body = res.json();
        return body;
    };
    CategoriesService.prototype.extractCategoriesData = function (res) {
        var body = res.json();
        var result = body || {};
        return result;
    };
    CategoriesService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    CategoriesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CategoriesService);
    return CategoriesService;
}());
exports.CategoriesService = CategoriesService;
