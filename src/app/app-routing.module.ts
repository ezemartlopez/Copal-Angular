import { NgModule } from "@angular/core";
import { RouterModule, RouterOutlet, Routes } from "@angular/router";

// Import routed components
import { PageNotFoundComponent } from "./page-not-found-component/page-not-found-component.component";
import { AdministracionComponent } from "./administracion/administracion.component";
import { DialogBodyComponent } from "./dialog-body/dialog-body.component";
import { VerSocioComponent } from "./ver-socio/ver-socio.component";
//Departamentos
import {DepartamentoComponent} from './departamento/departamento.component';
//import { FormularioGrupoDepartamentoComponent } from "./departamento/formulario-grupo-departamento/formulario-grupo-departamento.component";
import { FormularioDepartamentoComponent } from "./departamento/formulario-departamento/formulario-departamento.component";
import { EditarFormularioGrupoDepartamentoComponent } from "./departamento/editar-formulario-grupo-departamento/editar-formulario-grupo-departamento.component";
import { FormularioDepartamentoEditarComponent } from "./departamento/formulario-departamento-editar/formulario-departamento-editar.component";
import { VerDepartamentoComponent } from "./departamento/ver-departamento/ver-departamento.component";
import { FormularioSuperDepartamentoDepartamentoComponent } from "./departamento/formulario-super-departamento-departamento/formulario-super-departamento-departamento.component";
import { EventosComponent } from "./eventos/eventos.component";
import { CrearEventoComponent } from "./eventos/vistas/crear-evento/crear-evento.component";
import { VerEventoComponent } from "./eventos/vistas/ver-evento/ver-evento.component";
import { EditarEventoComponent } from "./eventos/vistas/editar-evento/editar-evento.component";
import { RegistarseFormularioEventoComponent } from "./eventos/vistas/registarse-formulario-evento/registarse-formulario-evento.component";
import { CrearEventov1Component } from "./eventos/vistas/crear-eventov1/crear-eventov1.component";
import { EspaciosColaborativosComponent } from "./espacios-colaborativos/espacios-colaborativos.component";
import { FormularioReservacionComponent } from "./espacios-colaborativos/vistas/formulario-reservacion/formulario-reservacion.component";
import { VerMiReservacionComponent } from "./espacios-colaborativos/vistas/ver-mi-reservacion/ver-mi-reservacion.component";
import { HistorialEspaciosComponent } from "./espacios-colaborativos/vistas/historial-espacios/historial-espacios.component";

const routes: Routes = [
  //Inicio gestion de Socios
  { path: "", redirectTo: "/gestion-de-socios", pathMatch: "full" }, // Redirecciona a la ruta /gestion-de-socios
  {
    path: "gestion-de-socios",
      children: [
        { path: "", component: AdministracionComponent }, // Redirecciona a la ruta /gestion-de-socios/agregar-socio
        { path: "agregar-socio", component: DialogBodyComponent}, // Formulario para agregar un socio
        { path: "editar-socio/:id", component: DialogBodyComponent},// Formulario para editar un socio
        { path: "ver-socio/:id", component: VerSocioComponent},//Dejo esto y después cambialo por VerSocioComponent cuando esté hecho.
      ],
  }, 
  // Fin de Gestión de socios
  //Inicio de Departamentos
  
  {path:"departamentos", children:[
    //Subrutas internas en departamentos
      {path:"", component:DepartamentoComponent, pathMatch:"full"},
      {path:"agregar-departamento/:id", component:FormularioDepartamentoComponent, pathMatch:"full"},
      //{path:"agregar-grupo",component:FormularioGrupoDepartamentoComponent},
      {path:"editar-grupo/:id",component:EditarFormularioGrupoDepartamentoComponent},
      {path:"editar-departamento/:id", component:FormularioDepartamentoEditarComponent},
      {path:"ver-departamento/:id", component:VerDepartamentoComponent},
      {path:"agregar-grupo", component:FormularioSuperDepartamentoDepartamentoComponent}
    ]
  },
  {path:"eventos", children:[
    {path: "", component: EventosComponent},
    {path:"crear-evento", component: CrearEventoComponent},
    {path:"ver-evento/:id", component: VerEventoComponent},
    {path:"editar-evento/:id", component: EditarEventoComponent},
    {path:"invitacion/:id", component:RegistarseFormularioEventoComponent}
  ]},
  // Fin gestion de socios
  {path:"espacios-colaborativos",children:[
    {path:"", component:EspaciosColaborativosComponent},
    {path:"reservacion-espacio", component:FormularioReservacionComponent},
    {path:"reservacion", component: VerMiReservacionComponent},
    {path:"historial-espacios", component: HistorialEspaciosComponent}
  ]},
  { path: "**", component: PageNotFoundComponent }, // Not found
];
  //Fin de Departamentos

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, RouterOutlet],
})
export class AppRoutingModule {}
