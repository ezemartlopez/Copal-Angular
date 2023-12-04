"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EspaciosColaborativosComponent = void 0;
var core_1 = require("@angular/core");
var EspaciosColaborativosComponent = /** @class */ (function () {
    function EspaciosColaborativosComponent(apiService) {
        this.apiService = apiService;
        this.mostrarModal = false;
        this.opcionesDepartamentos = [];
        this.opcionesEstados = [];
        this.loadding = true;
        this.infoCargada = false;
        this.loadding = true;
        this.infoCargada = false;
        this.seAplicoFiltro = false;
        this.selectDepartamento = 0;
        this.selectEstado = 0;
        this.selectModalidad = 'Por Modalidad';
        this.inputNombre = '';
    }
    EspaciosColaborativosComponent.prototype.ngOnInit = function () {
        this.getReservas();
        this.getReservasEstado();
    };
    EspaciosColaborativosComponent.prototype.redireccionar = function (url) {
        window.location.href = url;
    };
    EspaciosColaborativosComponent.prototype.hayEventos = function () {
        console.log(this.reservasCopal.length);
        return this.reservasCopal.length !== 0;
    };
    EspaciosColaborativosComponent.prototype.abrirModal = function () {
        this.mostrarModal = true;
        console.log("Modal abierto");
    };
    EspaciosColaborativosComponent.prototype.cerrarModal = function () {
        this.mostrarModal = false;
        console.log("Modal cerrado");
    };
    EspaciosColaborativosComponent.prototype.abrirModalEdit = function () {
        this.mostrarModal = true;
        console.log("Modal abierto");
    };
    EspaciosColaborativosComponent.prototype.cerrarModalEdit = function () {
        this.mostrarModal = false;
        console.log("Modal cerrado");
    };
    //Obtener reservas API
    EspaciosColaborativosComponent.prototype.getReservas = function () {
        var _this = this;
        this.apiService.obtenerReservas(function (data) {
            // Lógica para manejar los datos exitosos
            // Aquí puedes asignar los datos a una propiedad de tu componente si es necesario
            _this.reservasCopal = data;
        }, function () {
            // Lógica para manejar errores
            console.log('Error al obtener reservas');
        });
    };
    EspaciosColaborativosComponent.prototype.getReservasEstado = function () {
        var _this = this;
        this.apiService.obtenerReservasEstados(function (data) {
            // Lógica para manejar los datos exitosos
            console.log('Datos de reservas estados:', data);
            _this.opcionesTipoReserva = data;
            // Aquí puedes asignar los datos a una propiedad de tu componente si es necesario
        }, function () {
            // Lógica para manejar errores
            console.log('Error al obtener reservas estados');
        });
    };
    EspaciosColaborativosComponent = __decorate([
        core_1.Component({
            selector: 'app-espacios-colaborativos',
            templateUrl: './espacios-colaborativos.component.html',
            styleUrls: ['./espacios-colaborativos.component.css']
        })
    ], EspaciosColaborativosComponent);
    return EspaciosColaborativosComponent;
}());
exports.EspaciosColaborativosComponent = EspaciosColaborativosComponent;
