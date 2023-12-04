"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FormularioSuperDepartamentoDepartamentoComponent = void 0;
var core_1 = require("@angular/core");
var FormularioSuperDepartamentoDepartamentoComponent = /** @class */ (function () {
    function FormularioSuperDepartamentoDepartamentoComponent(apiService, api, router, toastr) {
        this.apiService = apiService;
        this.api = api;
        this.router = router;
        this.toastr = toastr;
        this.usuarioDefecto = { id: 0, nombre: "NINGUNO" }; //usuarios 
        this.rolDefecto = { id: 0, rol: "Seleccione el Rol" };
        this.formularioEnviarDefecto = {
            nombreDeDepartamento: "",
            descripcion: "",
            autoridades: []
        };
        this.formularioEnviar = {
            nombreDeDepartamento: this.formularioEnviarDefecto.nombreDeDepartamento,
            descripcion: this.formularioEnviarDefecto.descripcion,
            autoridades: []
        };
        this.opcionesRol = [];
        this.opcionesUsuarios = [];
        this.inputGrupoNombre = "";
        this.inputGrupoDescripcion = "";
        this.inputUsuarioNombre = "";
        this.inputUsuarioRol = this.opcionesRol[0];
        this.inputUsuario = this.opcionesUsuarios[0];
        this.usuariosDepartamento = [];
    }
    FormularioSuperDepartamentoDepartamentoComponent.prototype.ngOnInit = function () {
        this.ObtenerUsuariosApi();
        this.ObtenerRolesApi();
    };
    FormularioSuperDepartamentoDepartamentoComponent.prototype.ObtenerRolesApi = function () {
        var _this = this;
        // Llamar a la función getRoles del servicio y obtener los datos
        this.apiService.getRoles().subscribe(function (data) {
            // Aquí asumes que data es un array de objetos con propiedades 'value' y 'label'
            _this.opcionesRol = _this.opcionesRol.concat(data);
            console.log("Exito en obtener roles");
            console.log(_this.opcionesRol);
        }, function (error) {
            console.error('Error al obtener opciones:', error);
        });
    };
    //usuarios
    FormularioSuperDepartamentoDepartamentoComponent.prototype.ObtenerUsuariosApi = function () {
        var _this = this;
        // Llamar a la función getRoles del servicio y obtener los datos
        this.apiService.getUsuarios().subscribe(function (data) {
            // Aquí asumes que data es un array de objetos con propiedades 'value' y 'label'
            _this.opcionesUsuarios = _this.opcionesUsuarios.concat(data);
            console.log("Exito en obtener usuarios");
            console.log(_this.opcionesUsuarios);
        }, function (error) {
            console.error('Error al obtener opciones:', error);
        });
    };
    FormularioSuperDepartamentoDepartamentoComponent.prototype.listarUsuarios = function () {
        return this.usuariosDepartamento;
    };
    FormularioSuperDepartamentoDepartamentoComponent.prototype.resetearInputUsuario = function () {
        this.inputUsuario = this.usuarioDefecto;
        this.inputUsuarioRol = this.rolDefecto;
    };
    FormularioSuperDepartamentoDepartamentoComponent.prototype.agregarUsuario = function () {
        if (this.inputUsuario && this.inputUsuario.id !== 0) {
            this.usuariosDepartamento.push({ usuario: this.inputUsuario, rol: this.inputUsuarioRol });
            console.log("lISTA:", this.inputUsuarioRol);
            console.log("Usuarios Departamentos: ", this.usuariosDepartamento);
            this.formularioEnviar.autoridades.push({ rolId: this.inputUsuarioRol.id, usuarioId: this.inputUsuario.id });
            this.resetearInputUsuario();
        }
        else {
            alert("Usuario a agregar Invalido");
        }
    };
    FormularioSuperDepartamentoDepartamentoComponent.prototype.eliminarUsuarioCargado = function (id) {
        this.usuariosDepartamento = this.usuariosDepartamento.filter(function (usuario) { return usuario.name !== id; });
        console.log("Se elimino el usuario: ", id);
    };
    FormularioSuperDepartamentoDepartamentoComponent.prototype.enviarGrupo = function () {
        if (this.inputGrupoNombre.trim() === '' || this.inputGrupoDescripcion.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        else {
            // Lógica para enviar el formulario si los campos no están vacíos
            // Puedes realizar aquí la lógica de envío de datos al servidor, etc.
            console.log('Formulario enviado con éxito.');
            console.log("DATOS PARA ENVIAR ");
            this.formularioEnviar.nombreDeDepartamento = this.inputGrupoNombre;
            this.formularioEnviar.descripcion = this.inputGrupoDescripcion;
            console.log(this.formularioEnviar);
            this.mostrarVentanaExitoYRedirigir();
            var grupoData = this.formularioEnviar;
            // Llama a la función crearGrupo del servicio
            this.api.crearGrupo(grupoData, function (response) {
                // Esta función se ejecutará cuando la solicitud sea exitosa
                console.log('Grupo creado/enviado con éxito:', response);
                // Aquí puedes realizar cualquier acción adicional después de la creación del grupo.
            }, function (error) {
                // Esta función se ejecutará si ocurre un error en la solicitud
                console.error('Error al crear el grupo:', error);
                // Aquí puedes manejar el error de acuerdo a tus necesidades.
            });
        }
    };
    FormularioSuperDepartamentoDepartamentoComponent.prototype.mostrarVentanaExitoYRedirigir = function () {
        var _this = this;
        // Muestra una notificación de éxito
        this.toastr.success('Operación exitosa', 'Éxito');
        // Redirección a la ruta después de un breve retraso (ajusta el tiempo según tus necesidades)
        setTimeout(function () {
            _this.router.navigate(['/departamentos']); // Reemplaza 'ruta-de-destino' con la ruta a la que deseas redirigir
        }, 2000); // Redirección después de 3 segundos (ajusta el tiempo según tus necesidades)
    };
    FormularioSuperDepartamentoDepartamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-formulario-super-departamento-departamento',
            templateUrl: './formulario-super-departamento-departamento.component.html',
            styleUrls: ['./formulario-super-departamento-departamento.component.css']
        })
    ], FormularioSuperDepartamentoDepartamentoComponent);
    return FormularioSuperDepartamentoDepartamentoComponent;
}());
exports.FormularioSuperDepartamentoDepartamentoComponent = FormularioSuperDepartamentoDepartamentoComponent;
