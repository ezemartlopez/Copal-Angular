"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiServicioService = void 0;
var core_1 = require("@angular/core");
var ApiServicioService = /** @class */ (function () {
    function ApiServicioService(http) {
        this.http = http;
        this.base = 'https://acc-squad-m1s2-back-dev.dds.disilab.cpci.org.ar';
        this.urlEventos = this.base + '/eventos';
        this.urlBusqueda = this.base + '/eventos/search';
        this.urlCrearEvento = this.urlEventos + '/crear-evento';
        this.urlProvincias = this.base + '/provincias';
        this.urlDepartamentos = this.base + '/subDepartamento?formato=basico';
        this.urlEstados = this.base + '/eventos/estados';
        this.urlUsuarios = this.base + '/usuarios?formato=basico';
        this.urlSocios = this.base + '/socios?formato=basico';
    }
    /* funciones generales */
    ApiServicioService.prototype.getProvincias = function (setter, errorHandler) {
        this.http.get(this.urlProvincias).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setter([]); // Establece una lista vacía como respuesta
        });
    };
    ApiServicioService.prototype.getLocalidades = function (idProvincia, setter, errorHandler) {
        var url = this.urlProvincias + ("/" + idProvincia + "/localidades");
        this.http.get(url).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setter([]); // Establece una lista vacía como respuesta
        });
    };
    ApiServicioService.prototype.getDepartamentos = function (setter, errorHandler) {
        this.http.get(this.urlDepartamentos).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setter([]); // Establece una lista vacía como respuesta
        });
    };
    ApiServicioService.prototype.getEstados = function (setter, errorHandler) {
        this.http.get(this.urlEstados).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setter([]); // Establece una lista vacía como respuesta
        });
    };
    ApiServicioService.prototype.getUsuarios = function (setter, errorHandler) {
        this.http.get(this.urlUsuarios).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setter([]); // Establece una lista vacía como respuesta
        });
    };
    ApiServicioService.prototype.getPage = function (filtroAPlicado, parametros, setter, setterError, errorHandler) {
        var url = filtroAPlicado ? this.urlBusqueda : this.urlEventos;
        url += parametros;
        console.log('llama a: ', url);
        this.http.get(url).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setterError([]); // Establece una lista vacía como respuesta
        });
    };
    ///eventos/invitacion/{código}
    ApiServicioService.prototype.getEventoPorCodigo = function (codigo, setter, errorHandler) {
        var url = this.urlEventos + ("/invitacion/" + codigo);
        this.http.get(url).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setter(null); // Establece una lista vacía como respuesta
        });
    };
    /* ########################################################################################################################## */
    /* LLAMADAS PROPIAS DE CREAR EVENTOS */
    /* obtengo la info para el formulario crear evento */
    ApiServicioService.prototype.requisitosEventos = function (setter, errorHandler) {
        this.http.get(this.urlEventos).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setter([]); // Establece una lista vacía como respuesta
        });
    };
    /* Get para obtener el evento por su id */
    ApiServicioService.prototype.getEvento = function (id, successCallback, errorCallback) {
        var ruta = this.urlEventos + ("/" + id);
        this.http.get(ruta).subscribe(function (response) {
            if (successCallback) {
                successCallback(response);
            }
            return;
        }, function (error) {
            console.log(error);
            if (errorCallback) {
                errorCallback(error);
            }
            return;
        });
    };
    /* POST para crear el evento */
    ApiServicioService.prototype.postEvento = function (data, successCallback, errorCallback) {
        this.http.post(this.urlEventos, data).subscribe(function (response) {
            if (successCallback) {
                successCallback(response);
            }
            console.log(response);
            return;
        }, function (error) {
            console.log(error);
            if (errorCallback) {
                errorCallback(error);
            }
            return;
        });
    };
    /* Put para editar un evento por su id */
    ApiServicioService.prototype.putEvento = function (id, data, successCallback, errorCallback) {
        var ruta = this.urlEventos + ("/" + id);
        this.http.put(ruta, data).subscribe(function (response) {
            if (successCallback) {
                successCallback(response);
            }
            return;
        }, function (error) {
            console.log(error);
            if (errorCallback) {
                errorCallback(error);
            }
            return;
        });
    };
    /* Delete para borrar un evento por su id */
    ApiServicioService.prototype.deleteEvento = function (id, successCallback, errorCallback) {
        var ruta = this.urlEventos + ("/" + id);
        this.http["delete"](ruta).subscribe(function (response) {
            if (successCallback) {
                successCallback(response);
            }
            return;
        }, function (error) {
            console.log(error);
            if (errorCallback) {
                errorCallback(error);
            }
            return;
        });
    };
    ApiServicioService.prototype.getEventosCopal = function (setter, setterError, errorHandler) {
        this.http.get(this.urlEventos).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setterError([]); // Establece una lista vacía como respuesta
        });
    };
    ApiServicioService.prototype.getEventosCopalFilter = function (filter, setter, setterError, errorHandler) {
        //eventos?tipoEvento=HIBRIDO&departamentoId=1&estadoId=2&page=1
        var url = this.urlBusqueda + ("?" + filter);
        this.http.get(url).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setterError([]); // Establece una lista vacía como respuesta
        });
    };
    /* ########################################################################################################################## */
    //LLAMADA PARA REGISTRAR UN USUARIO A UN EVENTO
    //eventos/{idEvento}/participantes
    ApiServicioService.prototype.postRegistro = function (data, idEvento, successCallback, errorCallback) {
        var url = this.urlEventos + ("/" + idEvento + "/participantes");
        this.http.post(url, data).subscribe(function (response) {
            if (successCallback) {
                successCallback(response);
            }
            return;
        }, function (error) {
            console.log(error);
            if (errorCallback) {
                errorCallback(error);
            }
            return;
        });
    };
    ApiServicioService.prototype.subirImagen = function (idEvento, file) {
        var formData = new FormData();
        formData.append('imagen', file);
        var url = this.urlEventos + ("/" + idEvento + "/imagen");
        return this.http.post(url, formData);
    };
    //Solicitud para obtener los socios 
    ApiServicioService.prototype.getSocios = function (setter, errorHandler) {
        this.http.get(this.urlSocios).subscribe(function (data) { setter(data); }, // Llama a la función "setter" para guardar los datos
        function (error) {
            // En caso de error, Llama a la función "errorHandler" si se proporciona
            if (errorHandler) {
                errorHandler(error);
            }
            setter([]); // Establece una lista vacía como respuesta
        });
    };
    ApiServicioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiServicioService);
    return ApiServicioService;
}());
exports.ApiServicioService = ApiServicioService;
