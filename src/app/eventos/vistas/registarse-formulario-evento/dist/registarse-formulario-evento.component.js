"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistarseFormularioEventoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegistarseFormularioEventoComponent = /** @class */ (function () {
    function RegistarseFormularioEventoComponent(servicioAPI, route, fb) {
        this.servicioAPI = servicioAPI;
        this.route = route;
        this.fb = fb;
        this.campos = ['input', 'input1', 'input2', 'input3', 'input4'];
        this.valorEmail = '';
        this.isVisible = true; // Inicialmente visible
        this.eventoCompleto = {};
        this.imagen = {
            urlPublica: ""
        };
        this.eventoAsociado = {
            id: 2,
            flyer: {
                urlPublica: ""
            },
            nombre: "",
            fechaHoraInicio: "",
            urlInvitacion: "",
            departamento: "",
            ubicacion: "",
            estado: ""
        };
        this.codigo = '';
        this.isLoadding = true;
        this.usuariosObtenidos = [];
        this.formularioRegistro = {
            nombre: '',
            apellido: '',
            email: '',
            organizacion: '',
            invitadoPor: 0 // Puedes asignar el valor correcto según tu lógica
        };
        //
        this.exito = false;
        this.error = false;
        this.miFormulario = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]]
        });
        this.otraOrganizacion = "";
    }
    RegistarseFormularioEventoComponent.prototype.ngOnInit = function () {
        this.getUsuarios();
        this.obtenerId();
        this.getSocios();
    };
    RegistarseFormularioEventoComponent.prototype.obtenerId = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.codigo = id ? id : ""; // 'id' es el nombre del parámetro definido en la ruta
            console.log("Codigo: ", _this.codigo);
        });
        //Llamo al evento
        this.getEvento();
    };
    // Método para cambiar la visibilidad
    RegistarseFormularioEventoComponent.prototype.toggleVisibility = function () {
        this.isVisible = !this.isVisible;
    };
    RegistarseFormularioEventoComponent.prototype.enviarDatos = function () {
        var _this = this;
        var hayCampoInvalido = this.campos.some(function (id) { return _this.esCampoInvalido(id); });
        if (hayCampoInvalido) {
            console.log('Al menos un campo está vacío. No se pueden enviar los datos.');
        }
        else {
            // Todos los campos están llenos, puedes enviar los datos y hacer el  servicio POST al 
            //backend
            this.isVisible = false;
            console.log('Todos los campos están llenos. Enviar datos...');
            if (this.formularioRegistro.organizacion == "otra") {
                this.formularioRegistro.organizacion = this.otraOrganizacion;
            }
            console.log(this.formularioRegistro);
            this.servicioAPI.postRegistro(this.formularioRegistro, this.eventoAsociado.id, function (response) {
                // Manejar la respuesta exitosa aquí
                console.log('Registro exitoso:', response);
                _this.exito = true;
            }, function (error) {
                // Manejar el error aquí
                console.error('Error al registrar participante:', error);
                _this.error = true;
            });
        }
    };
    RegistarseFormularioEventoComponent.prototype.regresar = function () {
        window.location.href = '/eventos';
    };
    RegistarseFormularioEventoComponent.prototype.esCampoInvalido = function (id) {
        var valorInput = document.getElementById(id).value;
        return valorInput.trim() === '';
    };
    RegistarseFormularioEventoComponent.prototype.getUsuarios = function () {
        var _this = this;
        this.servicioAPI.getUsuarios(function (data) {
            // Manejar los datos obtenidos del servicio aquí
            _this.usuariosObtenidos = data;
        }, function (error) {
            // Manejar el error aquí si es necesario
            console.error('Error al obtener los usuarios:', error);
        });
    };
    RegistarseFormularioEventoComponent.prototype.obtenerhora = function (fecha) {
        var arreglo = [];
        arreglo = fecha.split('T');
        return arreglo[1].slice(0, -3);
    };
    RegistarseFormularioEventoComponent.prototype.getEvento = function () {
        var _this = this;
        this.servicioAPI.getEventoPorCodigo(this.codigo, function (data) {
            // Manejar los datos obtenidos del servicio aquí
            console.log('evento:', data);
            _this.eventoAsociado = data;
            _this.getEventoCompleto(_this.eventoAsociado.id);
        }, function (error) {
            // Manejar el error aquí si es necesario
            console.error('Error al obtener el evento:', error);
        });
        this.isLoadding = false;
    };
    RegistarseFormularioEventoComponent.prototype.enviarFormulario = function (data, id) {
        this.servicioAPI.postRegistro(data, id, function (response) {
            console.log('Se envio el formulario con exito', response);
        }, function (error) {
            console.error('Error al enviar el registro', error);
        });
    };
    RegistarseFormularioEventoComponent.prototype.getEventoCompleto = function (id) {
        var _this = this;
        this.servicioAPI.getEvento(id, function (response) {
            // Manejar la respuesta exitosa aquí
            console.log('Evento Completo:', response);
            _this.eventoCompleto = response;
        }, function (error) {
            // Manejar errores aquí
            console.error('Error al obtener el evento:', error);
        });
    };
    RegistarseFormularioEventoComponent.prototype.isValidEmail = function (email) {
        // Puedes agregar aquí tu lógica personalizada de validación de correo electrónico
        // Por ahora, simplemente verifica si contiene un '@'
        return email.includes('@');
    };
    RegistarseFormularioEventoComponent.prototype.getSocios = function () {
        var _this = this;
        this.servicioAPI.getSocios(function (data) {
            // Manejar los datos obtenidos del servicio aquí
            _this.listaSocios = data;
            console.log("listado de socios : ", _this.listaSocios);
        }, function (error) {
            // Manejar el error aquí si es necesario
            console.error('Error al obtener los usuarios:', error);
        });
    };
    RegistarseFormularioEventoComponent = __decorate([
        core_1.Component({
            selector: 'app-registarse-formulario-evento',
            templateUrl: './registarse-formulario-evento.component.html',
            styleUrls: ['./registarse-formulario-evento.component.css']
        })
    ], RegistarseFormularioEventoComponent);
    return RegistarseFormularioEventoComponent;
}());
exports.RegistarseFormularioEventoComponent = RegistarseFormularioEventoComponent;
