"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardReservasComponent = void 0;
var core_1 = require("@angular/core");
var CardReservasComponent = /** @class */ (function () {
    function CardReservasComponent() {
        this.mostrarModal = false;
        this.mostrarModalEdit = false;
        this.mostrarModalDelete = false;
        this.estado = 0;
        this.horaInicioSinSegundo = '';
        this.horaFinSinSegundo = '';
        var fechaString = "2023-11-30";
        this.fechaFormateada = this.formatearFecha(fechaString);
    }
    CardReservasComponent.prototype.getClasePorEstado = function (estado) {
        switch (estado) {
            case 1:
                return 'estado-pendiente';
            case 2:
                return 'estado-aceptado';
            case 3:
                return 'estado-aceptado-parcial';
            case 4:
                return 'estado-rechazado';
            case 5:
                return 'estado-cancelado';
            default:
                return 'estado-desconocido';
        }
    };
    CardReservasComponent.prototype.abrirModal = function () {
        this.mostrarModal = true;
        console.log("Modal abierto");
    };
    CardReservasComponent.prototype.cerrarModal = function () {
        this.mostrarModal = false;
        console.log("Modal cerrado");
    };
    CardReservasComponent.prototype.abrirModalEdit = function () {
        this.mostrarModalEdit = true;
        console.log("Modal edit abierto");
    };
    CardReservasComponent.prototype.cerrarModalEdit = function () {
        this.mostrarModalEdit = false;
        console.log("Modal edit cerrado");
    };
    CardReservasComponent.prototype.abrirModalDelete = function () {
        this.mostrarModalDelete = true;
        console.log("Modal Delete abierto");
    };
    CardReservasComponent.prototype.cerrarModalDelete = function () {
        this.mostrarModalDelete = false;
        console.log("Modal Modal Delete cerrado");
    };
    CardReservasComponent.prototype.formatearFecha = function (fechaString) {
        // Convertir la cadena de fecha a un objeto Date
        var fecha = new Date(fechaString);
        // Días de la semana y meses en español
        var diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        // Obtener el día de la semana, el día del mes y el mes
        var diaSemana = diasSemana[fecha.getDay()];
        var diaMes = fecha.getDate();
        var mes = meses[fecha.getMonth()];
        var anio = fecha.getFullYear();
        // Construir la cadena de fecha formateada
        var fechaFormateada = diaSemana + ', ' + diaMes + ' de ' + mes + ' ' + anio;
        return fechaFormateada;
    };
    __decorate([
        core_1.Input()
    ], CardReservasComponent.prototype, "infoReservas");
    CardReservasComponent = __decorate([
        core_1.Component({
            selector: 'app-card-reservas',
            templateUrl: './card-reservas.component.html',
            styleUrls: ['./card-reservas.component.css']
        })
    ], CardReservasComponent);
    return CardReservasComponent;
}());
exports.CardReservasComponent = CardReservasComponent;
