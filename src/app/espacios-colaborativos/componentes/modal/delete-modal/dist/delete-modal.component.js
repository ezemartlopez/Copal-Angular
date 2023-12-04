"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DeleteModalComponent = void 0;
var core_1 = require("@angular/core");
var DeleteModalComponent = /** @class */ (function () {
    function DeleteModalComponent(apiService) {
        this.apiService = apiService;
        this.showModalDelete = false;
        this.closeModal = new core_1.EventEmitter();
        this.estado = 0;
        var fechaString = "2023-11-30";
        this.fechaFormateada = this.formatearFecha(fechaString);
    }
    DeleteModalComponent.prototype.ngOnInit = function () {
    };
    DeleteModalComponent.prototype.cerrarModal = function () {
        this.showModalDelete = false;
        this.closeModal.emit();
    };
    DeleteModalComponent.prototype.getClasePorEstado = function (estado) {
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
    DeleteModalComponent.prototype.formatearFecha = function (fechaString) {
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
    DeleteModalComponent.prototype.deleteReserva = function (id) {
        this.apiService.eliminarReserva(id, function (response) {
            // Maneja la respuesta exitosa aquí
            console.log("Se elimino la reserva:", id);
        }, function () {
            // Maneja el error aquí
        });
    };
    DeleteModalComponent.prototype.recargarPagina = function () {
        window.location.reload();
    };
    DeleteModalComponent.prototype.eliminarReserva = function () {
        this.deleteReserva(this.infoReservas.id);
        this.cerrarModal();
        this.recargarPagina();
    };
    __decorate([
        core_1.Input()
    ], DeleteModalComponent.prototype, "showModalDelete");
    __decorate([
        core_1.Input()
    ], DeleteModalComponent.prototype, "infoReservas");
    __decorate([
        core_1.Output()
    ], DeleteModalComponent.prototype, "closeModal");
    DeleteModalComponent = __decorate([
        core_1.Component({
            selector: 'app-delete-modal',
            templateUrl: './delete-modal.component.html',
            styleUrls: ['./delete-modal.component.css']
        })
    ], DeleteModalComponent);
    return DeleteModalComponent;
}());
exports.DeleteModalComponent = DeleteModalComponent;
