import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Importa ReactiveFormsModule y FormsModule

//Rutas
import { RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from '@angular/common/http';
//Componentes para utilizarse
import { AppComponent } from "./app.component";
import { NavbarModule } from "./navbar/navbar.module";
import { SidebarModule } from "./sidebar/sidebar.module";
import { AdministracionModuleModule } from "./administracion/administracion.module";
import { PageNotFoundComponent } from "./page-not-found-component/page-not-found-component.component";
import { dialogConfirmDeleteModuleModule } from "./dialog-confirm-delete/dialog-confirm-delete.module";
import { VerSocioComponent } from "./ver-socio/ver-socio.component";
import { DepartamentoComponent } from "./departamento/departamento.component";
import { CardDepartamentoInternoComponent } from './departamento/card-departamento-interno/card-departamento-interno.component';
import { TablaDepartamentosComponent } from './departamento/tabla-departamentos/tabla-departamentos.component';
//import { FormularioGrupoDepartamentoComponent } from './departamento/formulario-grupo-departamento/formulario-grupo-departamento.component';
import { FormularioDepartamentoComponent } from './departamento/formulario-departamento/formulario-departamento.component';
import { EditarFormularioGrupoDepartamentoComponent } from './departamento/editar-formulario-grupo-departamento/editar-formulario-grupo-departamento.component';
import { CardAgregarComponent } from './departamento/card-agregar/card-agregar.component';
import { FormularioDepartamentoEditarComponent } from './departamento/formulario-departamento-editar/formulario-departamento-editar.component';
import { VerDepartamentoComponent } from './departamento/ver-departamento/ver-departamento.component';
import { FormularioSuperDepartamentoDepartamentoComponent } from './departamento/formulario-super-departamento-departamento/formulario-super-departamento-departamento.component';
import { ModalInfoComponent } from './departamento/modal-info/modal-info.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { ToastrModule } from 'ngx-toastr';
import { EventosComponent } from './eventos/eventos.component';
import { CrearEventoComponent } from './eventos/vistas/crear-evento/crear-evento.component';
import { VerEventoComponent } from './eventos/vistas/ver-evento/ver-evento.component';
import { LoadingComponent } from './eventos/componentes/loading/loading.component';
import { EditarEventoComponent } from './eventos/vistas/editar-evento/editar-evento.component';
import { FiltroComponent } from './eventos/componentes/filtro/filtro.component';
import { CardComponent } from './eventos/componentes/card/card.component';
import { RegistarseFormularioEventoComponent } from './eventos/vistas/registarse-formulario-evento/registarse-formulario-evento.component';
import { CrearEventov1Component } from './eventos/vistas/crear-eventov1/crear-eventov1.component';
import { EspaciosColaborativosComponent } from './espacios-colaborativos/espacios-colaborativos.component';
import { FormularioReservacionComponent } from './espacios-colaborativos/vistas/formulario-reservacion/formulario-reservacion.component';
import { VerMiReservacionComponent } from './espacios-colaborativos/vistas/ver-mi-reservacion/ver-mi-reservacion.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CardReservasComponent } from './espacios-colaborativos/componentes/card/card-reservas/card-reservas.component';
import { ViewModalComponent } from './espacios-colaborativos/componentes/modal/view-modal/view-modal.component';
import { EditModalComponent } from './espacios-colaborativos/componentes/modal/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './espacios-colaborativos/componentes/modal/delete-modal/delete-modal.component';


@NgModule({
  declarations: [AppComponent, PageNotFoundComponent,DepartamentoComponent, CardDepartamentoInternoComponent, TablaDepartamentosComponent, FormularioDepartamentoComponent, EditarFormularioGrupoDepartamentoComponent, CardAgregarComponent, FormularioDepartamentoEditarComponent, VerDepartamentoComponent, FormularioSuperDepartamentoDepartamentoComponent, ModalInfoComponent, EventosComponent, CrearEventoComponent, VerEventoComponent, LoadingComponent, EditarEventoComponent, FiltroComponent, CardComponent, RegistarseFormularioEventoComponent, CrearEventov1Component, EspaciosColaborativosComponent, FormularioReservacionComponent, VerMiReservacionComponent, CardReservasComponent, ViewModalComponent, EditModalComponent, DeleteModalComponent],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,//Rutas del componente
    NavbarModule,
    AdministracionModuleModule,
    SidebarModule,
    RouterOutlet,
    dialogConfirmDeleteModuleModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
