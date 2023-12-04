"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Import routed components
var page_not_found_component_component_1 = require("./page-not-found-component/page-not-found-component.component");
var administracion_component_1 = require("./administracion/administracion.component");
var dialog_body_component_1 = require("./dialog-body/dialog-body.component");
var ver_socio_component_1 = require("./ver-socio/ver-socio.component");
//Departamentos
var departamento_component_1 = require("./departamento/departamento.component");
//import { FormularioGrupoDepartamentoComponent } from "./departamento/formulario-grupo-departamento/formulario-grupo-departamento.component";
var formulario_departamento_component_1 = require("./departamento/formulario-departamento/formulario-departamento.component");
var editar_formulario_grupo_departamento_component_1 = require("./departamento/editar-formulario-grupo-departamento/editar-formulario-grupo-departamento.component");
var formulario_departamento_editar_component_1 = require("./departamento/formulario-departamento-editar/formulario-departamento-editar.component");
var ver_departamento_component_1 = require("./departamento/ver-departamento/ver-departamento.component");
var formulario_super_departamento_departamento_component_1 = require("./departamento/formulario-super-departamento-departamento/formulario-super-departamento-departamento.component");
var eventos_component_1 = require("./eventos/eventos.component");
var crear_evento_component_1 = require("./eventos/vistas/crear-evento/crear-evento.component");
var ver_evento_component_1 = require("./eventos/vistas/ver-evento/ver-evento.component");
var editar_evento_component_1 = require("./eventos/vistas/editar-evento/editar-evento.component");
var registarse_formulario_evento_component_1 = require("./eventos/vistas/registarse-formulario-evento/registarse-formulario-evento.component");
var routes = [
    //Inicio gestion de Socios
    { path: "", redirectTo: "/gestion-de-socios", pathMatch: "full" },
    {
        path: "gestion-de-socios",
        children: [
            { path: "", component: administracion_component_1.AdministracionComponent },
            { path: "agregar-socio", component: dialog_body_component_1.DialogBodyComponent },
            { path: "editar-socio", component: dialog_body_component_1.DialogBodyComponent },
            { path: "ver-socio", component: ver_socio_component_1.VerSocioComponent },
        ]
    },
    // Fin de Gestión de socios
    //Inicio de Departamentos
    { path: "departamentos", children: [
            //Subrutas internas en departamentos
            { path: "", component: departamento_component_1.DepartamentoComponent, pathMatch: "full" },
            { path: "agregar-departamento/:id", component: formulario_departamento_component_1.FormularioDepartamentoComponent, pathMatch: "full" },
            //{path:"agregar-grupo",component:FormularioGrupoDepartamentoComponent},
            { path: "editar-grupo/:id", component: editar_formulario_grupo_departamento_component_1.EditarFormularioGrupoDepartamentoComponent },
            { path: "editar-departamento/:id", component: formulario_departamento_editar_component_1.FormularioDepartamentoEditarComponent },
            { path: "ver-departamento/:id", component: ver_departamento_component_1.VerDepartamentoComponent },
            { path: "agregar-grupo", component: formulario_super_departamento_departamento_component_1.FormularioSuperDepartamentoDepartamentoComponent }
        ]
    },
    { path: "eventos", children: [
            { path: "", component: eventos_component_1.EventosComponent },
            { path: "crear-evento", component: crear_evento_component_1.CrearEventoComponent },
            { path: "ver-evento/:id", component: ver_evento_component_1.VerEventoComponent },
            { path: "editar-evento/:id", component: editar_evento_component_1.EditarEventoComponent },
            { path: "registrarse/:id", component: registarse_formulario_evento_component_1.RegistarseFormularioEventoComponent }
        ] },
    // Fin gestion de socios
    { path: "**", component: page_not_found_component_component_1.PageNotFoundComponent },
];
//Fin de Departamentos
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule, router_1.RouterOutlet]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
