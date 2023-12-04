"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms"); // Importa ReactiveFormsModule y FormsModule
//Rutas
var router_1 = require("@angular/router");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/common/http");
//Componentes para utilizarse
var app_component_1 = require("./app.component");
var navbar_module_1 = require("./navbar/navbar.module");
var sidebar_module_1 = require("./sidebar/sidebar.module");
var administracion_module_1 = require("./administracion/administracion.module");
var page_not_found_component_component_1 = require("./page-not-found-component/page-not-found-component.component");
var dialog_confirm_delete_module_1 = require("./dialog-confirm-delete/dialog-confirm-delete.module");
var departamento_component_1 = require("./departamento/departamento.component");
var card_departamento_interno_component_1 = require("./departamento/card-departamento-interno/card-departamento-interno.component");
var tabla_departamentos_component_1 = require("./departamento/tabla-departamentos/tabla-departamentos.component");
//import { FormularioGrupoDepartamentoComponent } from './departamento/formulario-grupo-departamento/formulario-grupo-departamento.component';
var formulario_departamento_component_1 = require("./departamento/formulario-departamento/formulario-departamento.component");
var editar_formulario_grupo_departamento_component_1 = require("./departamento/editar-formulario-grupo-departamento/editar-formulario-grupo-departamento.component");
var card_agregar_component_1 = require("./departamento/card-agregar/card-agregar.component");
var formulario_departamento_editar_component_1 = require("./departamento/formulario-departamento-editar/formulario-departamento-editar.component");
var ver_departamento_component_1 = require("./departamento/ver-departamento/ver-departamento.component");
var formulario_super_departamento_departamento_component_1 = require("./departamento/formulario-super-departamento-departamento/formulario-super-departamento-departamento.component");
var modal_info_component_1 = require("./departamento/modal-info/modal-info.component");
var animations_1 = require("@angular/platform-browser/animations"); // Importa BrowserAnimationsModule
var ngx_toastr_1 = require("ngx-toastr");
var eventos_component_1 = require("./eventos/eventos.component");
var crear_evento_component_1 = require("./eventos/vistas/crear-evento/crear-evento.component");
var ver_evento_component_1 = require("./eventos/vistas/ver-evento/ver-evento.component");
var loading_component_1 = require("./eventos/componentes/loading/loading.component");
var editar_evento_component_1 = require("./eventos/vistas/editar-evento/editar-evento.component");
var filtro_component_1 = require("./eventos/componentes/filtro/filtro.component");
var card_component_1 = require("./eventos/componentes/card/card.component");
var registarse_formulario_evento_component_1 = require("./eventos/vistas/registarse-formulario-evento/registarse-formulario-evento.component");
var crear_eventov1_component_1 = require("./eventos/vistas/crear-eventov1/crear-eventov1.component");
var espacios_colaborativos_component_1 = require("./espacios-colaborativos/espacios-colaborativos.component");
var formulario_reservacion_component_1 = require("./espacios-colaborativos/vistas/formulario-reservacion/formulario-reservacion.component");
var ver_mi_reservacion_component_1 = require("./espacios-colaborativos/vistas/ver-mi-reservacion/ver-mi-reservacion.component");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var form_field_1 = require("@angular/material/form-field");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, page_not_found_component_component_1.PageNotFoundComponent, departamento_component_1.DepartamentoComponent, card_departamento_interno_component_1.CardDepartamentoInternoComponent, tabla_departamentos_component_1.TablaDepartamentosComponent, formulario_departamento_component_1.FormularioDepartamentoComponent, editar_formulario_grupo_departamento_component_1.EditarFormularioGrupoDepartamentoComponent, card_agregar_component_1.CardAgregarComponent, formulario_departamento_editar_component_1.FormularioDepartamentoEditarComponent, ver_departamento_component_1.VerDepartamentoComponent, formulario_super_departamento_departamento_component_1.FormularioSuperDepartamentoDepartamentoComponent, modal_info_component_1.ModalInfoComponent, eventos_component_1.EventosComponent, crear_evento_component_1.CrearEventoComponent, ver_evento_component_1.VerEventoComponent, loading_component_1.LoadingComponent, editar_evento_component_1.EditarEventoComponent, filtro_component_1.FiltroComponent, card_component_1.CardComponent, registarse_formulario_evento_component_1.RegistarseFormularioEventoComponent, crear_eventov1_component_1.CrearEventov1Component, espacios_colaborativos_component_1.EspaciosColaborativosComponent, formulario_reservacion_component_1.FormularioReservacionComponent, ver_mi_reservacion_component_1.VerMiReservacionComponent],
            imports: [
                animations_1.BrowserAnimationsModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                navbar_module_1.NavbarModule,
                administracion_module_1.AdministracionModuleModule,
                sidebar_module_1.SidebarModule,
                router_1.RouterOutlet,
                dialog_confirm_delete_module_1.dialogConfirmDeleteModuleModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                select_1.MatSelectModule,
                input_1.MatInputModule,
                forms_1.FormsModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
