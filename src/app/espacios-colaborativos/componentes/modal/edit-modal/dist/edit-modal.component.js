"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditModalComponent = void 0;
var core_1 = require("@angular/core");
var EditModalComponent = /** @class */ (function () {
    function EditModalComponent(apiService) {
        this.apiService = apiService;
        this.showModalEdit = false;
        this.closeModal = new core_1.EventEmitter();
        this.estado = 0;
        this.estadoSeleccionado = 0;
        var fechaString = "2023-11-30";
        this.fechaFormateada = this.formatearFecha(fechaString);
        this.opcionesEstados = [];
        this.editarEstado = { estado: 1, detalle: "" };
    }
    EditModalComponent.prototype.ngOnInit = function () {
        // Establecer el valor inicial basado en infoReservas.estado.id
        // Por ejemplo, asumamos que infoReservas.estado.id ya tiene un valor asignado
        this.estadoSeleccionado = this.infoReservas.estadoActual.estado.id;
        this.getReservasEstado();
        this.cambiarEstado();
    };
    EditModalComponent.prototype.cerrarModal = function () {
        this.showModalEdit = false;
        this.closeModal.emit();
    };
    EditModalComponent.prototype.getClasePorEstado = function (estado) {
        console.log("Funcion getClasePorEstado: ", estado);
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
                console.log("Estado desconocido: ", estado);
                return 'estado-desconocido';
        }
    };
    EditModalComponent.prototype.cambiarEstado = function () {
        return this.estadoSeleccionado;
    };
    EditModalComponent.prototype.formatearFecha = function (fechaString) {
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
    EditModalComponent.prototype.getReservasEstado = function () {
        var _this = this;
        this.apiService.obtenerReservasEstados(function (data) {
            // Lógica para manejar los datos exitosos
            _this.opcionesTipoReserva = data;
            console.log("Estados traidos: ", _this.opcionesTipoReserva);
            // Aquí puedes asignar los datos a una propiedad de tu componente si es necesario
        }, function () {
            // Lógica para manejar errores
            console.log('Error al obtener reservas estados');
        });
    };
    EditModalComponent.prototype.putReservaEstado = function (id, nuevoEstado) {
        this.apiService.editarReserva(id, nuevoEstado, function (response) {
            // Maneja la respuesta exitosa aquí
            console.log("Se hizo el put exitosamente");
            console.log("Datos actualzados:", nuevoEstado);
        }, function () {
            // Maneja el error aquí
        });
    };
    EditModalComponent.prototype.editarEstadoEnviar = function () {
        this.editarEstado.estado = this.cambiarEstado();
        console.log("id de reserva: ", this.infoReservas.id);
        console.log("DATOS A enviar: ", this.editarEstado);
        this.putReservaEstado(this.infoReservas.id, this.editarEstado);
        this.cerrarModal();
        /* this.recargarPagina(); */
        this.recargarConRetraso();
    };
    EditModalComponent.prototype.recargarPagina = function () {
        window.location.reload();
    };
    EditModalComponent.prototype.recargarConRetraso = function () {
        var _this = this;
        setTimeout(function () {
            _this.recargarPagina();
        }, 1500); // Espera de 2 segundos (2000 milisegundos) antes de recargar la página
    };
    __decorate([
        core_1.Input()
    ], EditModalComponent.prototype, "showModalEdit");
    __decorate([
        core_1.Input()
    ], EditModalComponent.prototype, "infoReservas");
    __decorate([
        core_1.Output()
    ], EditModalComponent.prototype, "closeModal");
    EditModalComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-modal',
            templateUrl: './edit-modal.component.html',
            styleUrls: ['./edit-modal.component.css']
        })
    ], EditModalComponent);
    return EditModalComponent;
}());
exports.EditModalComponent = EditModalComponent;
