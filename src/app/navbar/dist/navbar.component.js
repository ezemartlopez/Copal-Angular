"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent() {
        this.ocultarNav();
    }
    NavbarComponent.prototype.ngOnInit = function () { };
    NavbarComponent.prototype.ocultarNav = function () {
        var currentURL = window.location.href;
        var urlToHide = 'http://localhost:4200/eventos/registrarse';
        if (currentURL === urlToHide) {
            var navElement = document.getElementById('nav');
            if (navElement) {
                navElement.style.display = 'none'; // Oculta el elemento con el ID 'nav'
            }
        }
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: "app-navbar",
            templateUrl: "./navbar.component.html",
            styleUrls: ["./navbar.component.css"]
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
