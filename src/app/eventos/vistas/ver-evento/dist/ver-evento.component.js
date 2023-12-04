"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerEventoComponent = void 0;
var core_1 = require("@angular/core");
var VerEventoComponent = /** @class */ (function () {
    function VerEventoComponent(route, api) {
        this.route = route;
        this.api = api;
        this.loading = true;
        //para capturar el id de la ruta donde estamos y pedir con un get el evento segun id
        this.parametro = "";
        // Inicialización del objeto evento
        this.evento = null;
    }
    VerEventoComponent.prototype.ngOnInit = function () {
        this.obtenerId();
    };
    VerEventoComponent.prototype.obtenerId = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.parametro = id ? id : ""; // 'id' es el nombre del parámetro definido en la ruta
            console.log("Parametro: ", _this.parametro);
        });
        //se llama al proximo - llamar evento por su ID
        this.getEvento(parseInt(this.parametro));
    };
    VerEventoComponent.prototype.getEvento = function (id) {
        var _this = this;
        this.api.getEvento(id, function (response) {
            // Manejar la respuesta exitosa aquí
            console.log('Evento obtenido:', response);
            _this.evento = response;
            //this.setearFechasYHoras();
            _this.loading = false;
        }, function (error) {
            // Manejar errores aquí
            console.error('Error al obtener el evento:', error);
        });
    };
    VerEventoComponent.prototype.listarParticipante = function () {
        return this.evento.participantes;
    };
    /* eliminarParticipante(id:string){
      this.evento.participantes = this.evento.participantes.filter(usuario => usuario.nombre !== id);
      console.log("Se elimino el usuario: ", id);
    } */
    VerEventoComponent.prototype.getClasePorEstado = function (estado) {
        if (estado === 'aceptado') {
            return 'estado-aceptado';
        }
        else if (estado === 'pendiente') {
            return 'estado-pendiente';
        }
        else {
            return 'estado-rechazado';
        }
    };
    VerEventoComponent.prototype.obtenerhora = function (fecha) {
        var arreglo = [];
        arreglo = fecha.split('T');
        return arreglo[1].slice(0, -3);
    };
    VerEventoComponent.prototype.obtenerfecha = function (fecha) {
        var arreglo = [];
        arreglo = fecha.split('T');
        return arreglo[0];
    };
    //remover cuando se arregle
    VerEventoComponent.prototype.linkImagen = function () {
        return this.evento.flyer.urlPublica.replace('utn', '');
    };
    /* setearFechasYHoras(){
      this.horaInicio=this.obtenerhora(this.evento.fechaInicio);
      console.log(this.horaInicio);
      this.horaFin=this.obtenerhora(this.evento.fechaFin);
      console.log(this.horaFin);
      this.fechaInicio=this.obtenerfecha(this.evento.fechaInicio);
      this.fechaFin=this.obtenerfecha(this.evento.fechaFin);
  
      this.identificarEventoProximo();
    } */
    VerEventoComponent.prototype.identificarEventoProximo = function () {
        var fechaHora1 = new Date(this.evento.fechaInicio);
        var fechaHora2 = new Date();
        var diferenciaMilisegundos = Math.abs(fechaHora1.getTime() - fechaHora2.getTime());
        var limite24Horas = 24 * 60 * 60 * 1000;
        this.eventoProximo = diferenciaMilisegundos < limite24Horas;
    };
    VerEventoComponent = __decorate([
        core_1.Component({
            selector: 'app-ver-evento',
            templateUrl: './ver-evento.component.html',
            styleUrls: ['./ver-evento.component.css']
        })
    ], VerEventoComponent);
    return VerEventoComponent;
}());
exports.VerEventoComponent = VerEventoComponent;
