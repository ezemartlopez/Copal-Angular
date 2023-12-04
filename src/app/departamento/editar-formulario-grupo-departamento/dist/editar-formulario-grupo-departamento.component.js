"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditarFormularioGrupoDepartamentoComponent = void 0;
var core_1 = require("@angular/core");
var usuarios_1 = require("./usuarios");
var EditarFormularioGrupoDepartamentoComponent = /** @class */ (function () {
    function EditarFormularioGrupoDepartamentoComponent(router, apiService, ApiService, route) {
        this.router = router;
        this.apiService = apiService;
        this.ApiService = ApiService;
        this.route = route;
        this.rolDefecto = { id: 0, rol: "Seleccione el Rol" };
        this.parametro = "";
        this.usuarioDefecto = { id: 0, nombre: "NINGUNO" }; //usuarios 
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
        this.inputUsuarioRol = this.opcionesRol[0];
        this.opcionesUsuarios = [];
        this.inputUsuario = this.opcionesUsuarios[0];
        this.idGrupo = 0;
        this.grupoInformacion = null;
        this.inputGrupoNombre = usuarios_1.grupo.name;
        this.inputGrupoDescripcion = usuarios_1.grupo.description;
        this.listarGrupoUsuarios = usuarios_1.grupo.usuarios;
        this.inputUsuarioNombre = "";
        console.log("Listar Usuario: ", this.listarGrupoUsuarios);
        this.autoridadesTotal = [];
        console.log("Grupo Informacion: ", this.grupoInformacion);
    }
    EditarFormularioGrupoDepartamentoComponent.prototype.transformarArregloApi = function (info) {
        // La lógica de transformación va aquí
        var i = 0;
        var autoridades = [];
        info.forEach(function (objeto) {
            console.log("objeto: ", objeto);
            // Asegúrate de que autoridadesTotal[i] sea un objeto antes de asignarle propiedades
            autoridades[i] = autoridades[i] || {};
            autoridades[i].rolId = objeto.idRol;
            autoridades[i].usuarioId = objeto.idUsuario;
            i++;
        });
        return autoridades;
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.transformarArreglo = function (info) {
        // La lógica de transformación va aquí
        var i = 0;
        var autoridadesTotal = [];
        info.forEach(function (objeto) {
            console.log("objeto: ", objeto);
            // Asegúrate de que autoridadesTotal[i] sea un objeto antes de asignarle propiedades
            autoridadesTotal[i] = autoridadesTotal[i] || {};
            autoridadesTotal[i].idUsuario = objeto.usuario.id;
            autoridadesTotal[i].usuario = objeto.usuario.nombreCompleto;
            autoridadesTotal[i].idRol = objeto.rol.id;
            autoridadesTotal[i].rol = objeto.rol.rol;
            i++;
        });
        return autoridadesTotal;
    };
    //Llamado a las Apis
    EditarFormularioGrupoDepartamentoComponent.prototype.ngOnInit = function () {
        this.ObtenerRolesApi();
        this.ObtenerUsuariosApi();
        this.obtenerId();
        var cantidadElementos = this.listarGrupoUsuarios.length;
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.obtenerId = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.parametro = id ? id : ""; // 'id' es el nombre del parámetro definido en la ruta
            console.log("mi grupo id: ", _this.parametro);
        });
        this.ObtenerGrupo(parseInt(this.parametro));
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.ObtenerGrupo = function (idHijo) {
        var _this = this;
        // Llamar a la función getRoles del servicio y obtener los datos
        this.ApiService.getGrupo(idHijo, function (data) {
            _this.grupoInformacion = data;
            console.log("Grupo(id:", idHijo, "):  ", data);
            _this.autoridadesTotal = _this.transformarArreglo(data.autoridades);
            _this.idGrupo = data.id;
            console.log("Transformado: ", _this.autoridadesTotal);
        }, // Maneja los datos exitosos
        function (error) { console.error(error); } // Maneja el error (opcional)
        );
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.ObtenerRolesApi = function () {
        var _this = this;
        // Llamar a la función getRoles del servicio y obtener los datos
        this.apiService.getRoles().subscribe(function (data) {
            // Aquí asumes que data es un array de objetos con propiedades 'value' y 'label'
            _this.opcionesRol = _this.opcionesRol.concat(data);
            console.log("ObtenerRolesApi: ", _this.opcionesRol);
        }, function (error) {
            console.error('Error al obtener opciones:', error);
        });
    };
    //usuarios
    EditarFormularioGrupoDepartamentoComponent.prototype.ObtenerUsuariosApi = function () {
        var _this = this;
        // Llamar a la función getRoles del servicio y obtener los datos
        this.apiService.getUsuarios().subscribe(function (data) {
            // Aquí asumes que data es un array de objetos con propiedades 'value' y 'label'
            _this.opcionesUsuarios = _this.opcionesUsuarios.concat(data);
        }, function (error) {
            console.error('Error al obtener opciones:', error);
        });
    };
    //Funcion me permite  agregar los usuarios de grupo.autoridades a formularioEnviar.autoridades 
    //siguiendo los parametros de rolId y usuarioID
    EditarFormularioGrupoDepartamentoComponent.prototype.asignarRolesYUsuarios = function () {
        var _this = this;
        this.formularioEnviar.autoridades = this.listarGrupoUsuarios.map(function (listarGrupoUsuarios) {
            var rol = _this.opcionesRol.find(function (opcion) { return opcion.rol === listarGrupoUsuarios.rol; });
            if (rol) {
                return {
                    rolId: rol.id,
                    usuarioId: listarGrupoUsuarios.id
                };
            }
            else {
                return {
                    usuarioId: listarGrupoUsuarios.id,
                    rolId: 0
                };
            }
        });
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.agregarUsuario = function () {
        if (this.inputUsuario.id !== 0) {
            this.autoridadesTotal.push({ idUsuario: this.inputUsuario.id, usuario: this.inputUsuario.nombre, idRol: this.inputUsuarioRol.id, rol: this.inputUsuarioRol.rol });
            console.log("Agregar Usuario: ", this.autoridadesTotal);
            this.resetearInputUsuario();
        }
        else {
            alert("Usuario a agregar Invalido");
        }
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.resetearInputUsuario = function () {
        this.inputUsuario = this.usuarioDefecto;
        this.inputUsuarioRol = this.rolDefecto;
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.eliminarUsuarioCargado = function (id) {
        this.autoridadesTotal = this.autoridadesTotal.filter(function (usuario) { return usuario.usuario !== id; });
        console.log("Se elimino el usuario: ", id);
        console.log("Id del grupo: ");
        console.log("Nombre del grupo: ", this.inputGrupoNombre);
        console.log("Descripcion del grupo: ", this.inputGrupoDescripcion);
        console.log("Usuarios: ", this.autoridadesTotal);
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.editarUsuario = function (usuario) {
        console.log("Id del grupo: ");
        console.log("Nombre del grupo: ", this.inputGrupoNombre);
        console.log("Descripcion del grupo: ", this.inputGrupoDescripcion);
        console.log("Usuarios: ", this.listarGrupoUsuarios);
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.listarUsuarios = function () {
        this.asignarRolesYUsuarios();
        return this.listarGrupoUsuarios;
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.enviarGrupo = function () {
        this.formularioEnviar.nombreDeDepartamento = this.inputGrupoNombre;
        this.formularioEnviar.descripcion = this.inputGrupoDescripcion;
        this.formularioEnviar.autoridades = this.transformarArregloApi(this.autoridadesTotal);
        console.log("DATOS PARA ENVIAR ");
        console.log("ID GRUPO :", this.idGrupo);
        console.log(this.formularioEnviar);
        this.editarGrupo(this.idGrupo, this.formularioEnviar);
        console.log("TOTALES AUTORIDADES", this.formularioEnviar.autoridades);
        this.router.navigate(['/departamentos']);
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.editarGrupo = function (id, data) {
        this.ApiService.editarGrupo(id, data, this.successCallback, this.errorCallback);
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.successCallback = function (response) {
        console.log("Se hizo un put exitosamente");
    };
    EditarFormularioGrupoDepartamentoComponent.prototype.errorCallback = function (error) {
        console.log("No se pudo hacer el put:ERROR");
    };
    EditarFormularioGrupoDepartamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-formulario-grupo-departamento',
            templateUrl: './editar-formulario-grupo-departamento.component.html',
            styleUrls: ['./editar-formulario-grupo-departamento.component.css']
        })
    ], EditarFormularioGrupoDepartamentoComponent);
    return EditarFormularioGrupoDepartamentoComponent;
}());
exports.EditarFormularioGrupoDepartamentoComponent = EditarFormularioGrupoDepartamentoComponent;
