"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiServiceService = void 0;
var core_1 = require("@angular/core");
var ApiServiceService = /** @class */ (function () {
    function ApiServiceService(http) {
        this.http = http;
        this.production = true; //Variable que controla la configuracion api
        this.apiUrl = this.production ? 'https://acc-squad-m1s2-back-dev.dds.disilab.cpci.org.ar' : 'https://localhost:8080';
        this.baseModulo = this.apiUrl + '/espacios-colaborativos'; //Base de este servicio
    }
    //Observables cada uno configurado con su ruta
    ApiServiceService.prototype.getReservas = function () {
        var url = this.baseModulo + '/reservas';
        return this.http.get(url);
    };
    ApiServiceService.prototype.getReservasEstados = function () {
        var url = this.baseModulo + '/reservas/estados';
        return this.http.get(url);
    };
    ApiServiceService.prototype.getRecursos = function () {
        var url = this.baseModulo + '/recursos';
        return this.http.get(url);
    };
    ApiServiceService.prototype.putReserva = function (id, data) {
        var url = this.baseModulo + ("/reservas/" + id);
        return this.http.put(url, data);
    };
    ApiServiceService.prototype.deleteReserva = function (id) {
        var url = this.baseModulo + ("/reservas/" + id);
        return this.http["delete"](url);
    };
    //Funciones para obtener datos en el servicio
    //GET RESERVAS
    ApiServiceService.prototype.obtenerReservas = function (setter, setterError) {
        this.getReservas().subscribe({
            next: function (res) {
                console.log('Exito llamada: ', res);
                setter(res); //setter la data
            },
            error: function (error) {
                console.log('Error: ', error);
                setterError(); //setter funcion error
            },
            complete: function () {
                console.log('Termino la llamada Reservas');
            }
        });
    };
    //GET RECURSOS
    ApiServiceService.prototype.obtenerRecursos = function (setter, setterError) {
        this.getRecursos().subscribe({
            next: function (data) {
                console.log('Exito llamada: ', data);
                setter(data);
            },
            error: function (error) {
                console.log('Error: ', error);
                setterError();
            },
            complete: function () {
                console.log('Termino la llamada Recursos');
            }
        });
    };
    // GET RESERVAS ESTADOS
    ApiServiceService.prototype.obtenerReservasEstados = function (setter, setterError) {
        this.getReservasEstados().subscribe({
            next: function (data) {
                /* console.log('Exito llamada: ', data); */
                setter(data);
            },
            error: function (error) {
                console.log('Error: ', error);
                setterError();
            },
            complete: function () {
                /*  console.log('Termino la llamada Departamentos'); */
            }
        });
    };
    // PUT RESERVA
    ApiServiceService.prototype.editarReserva = function (id, nuevoEstado, successHandler, errorHandler) {
        this.putReserva(id, nuevoEstado).subscribe({
            next: function (response) {
                console.log('Respuesta:', response); // Puedes realizar acciones adicionales aquí
                successHandler(response);
            },
            error: function (error) {
                console.log('status error: ', error);
                errorHandler();
            }
        });
    };
    // DELETE RESERVA
    ApiServiceService.prototype.eliminarReserva = function (id, successHandler, errorHandler) {
        this.deleteReserva(id).subscribe({
            next: function (response) {
                console.log('Respuesta:', response); // Puedes realizar acciones adicionales aquí
                successHandler(response);
            },
            error: function (error) {
                console.log('status error: ', error);
                errorHandler();
            }
        });
    };
    ApiServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiServiceService);
    return ApiServiceService;
}());
exports.ApiServiceService = ApiServiceService;
/*EJEMPLO DE USO
//MANEJAR PETICION GET
obtenerDatosPorGet(){
  this.api.llamadaGetEjemplo(
    (data)=>{ this.arrayACargarData = data;},
    ()=>{ this.arrayACargarData = []; }
  );
}

//MANEJAR PETICION PUT
editarDatosPorPut(id: number, nuevoEstado: any){
  this.api.llamadaPutEjemplo(
    id,
    nuevoEstado,
    (response) => {
      // Maneja la respuesta exitosa aquí
    },
    () => {
      // Maneja el error aquí
    }
  );
}

//MANEJAR PETICION DELETE
eliminarDatosPorDelete(id: number){
  this.api.llamadaDeleteEjemplo(
    id,
    (response) => {
      // Maneja la respuesta exitosa aquí
    },
    () => {
      // Maneja el error aquí
    }
  );
}
*/ 
