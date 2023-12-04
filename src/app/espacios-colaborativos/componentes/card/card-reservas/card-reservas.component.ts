import { Component,Input } from '@angular/core';
import { partition } from 'rxjs';

interface RecursoSolicitado {
  id: number;
  fechaCreacion: string | null;
  fechaBaja: string | null;
  nombre: string;
  descripcion: string;
}

interface Departamento {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  icono: {
      imageNameID: string;
      urlPublica: string | null;
  };
  nombreDeDepartamento: string;
  descripcion: string;
  autoridades: any[];
  usuariosAsociados: any[];
}

interface Responsable {
  nombreCompleto: string;
  mail: string;
}

interface EspacioFisico {
  id: number;
  fechaCreacion: string | null;
  fechaBaja: string | null;
  nombre: string;
  descripcion: string;
}

interface Estado {
  id: number;
  fechaCreacion: string | null;
  fechaBaja: string | null;
  nombre: string;
}

interface EstadoActual {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  estado: Estado;
  detalle: string | null;
}

interface InfoReservas {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  descripcion: string;
  codigoDeSeguimiento: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  departamento: Departamento;
  responsable: Responsable;
  recursosSolicitados: RecursoSolicitado[];
  espacioFisico: EspacioFisico;
  estadoActual: EstadoActual;
}

@Component({
  selector: 'app-card-reservas',
  templateUrl: './card-reservas.component.html',
  styleUrls: ['./card-reservas.component.css']
})

export class CardReservasComponent {
  @Input() infoReservas:any;
  estado:number;
  mostrarModal = false;
  mostrarModalEdit=false;
  mostrarModalDelete=false;

  horaInicioSinSegundo:string;
  horaFinSinSegundo:string;
  fechaFormateada:string;

  constructor(){
    this.estado=0;
    this.horaInicioSinSegundo='';
    this.horaFinSinSegundo='';
    var fechaString = "2023-11-30";
    this.fechaFormateada = this.formatearFecha(fechaString);
  }

  
  getClasePorEstado(estado: number): string {
    switch (estado) {
      case 1:
        return 'estado-pendiente';
      case 2:
        return 'estado-aceptado';
      case 3:
        return 'estado-aceptado-parcial';
      case 4:
        return 'estado-rechazado';
      case 5:
        return 'estado-cancelado';
      default:
        return 'estado-desconocido';
    }
  }
  

  abrirModal(): void {
    this.mostrarModal = true;
    console.log("Modal abierto");
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    console.log("Modal cerrado");
  }
  abrirModalEdit(): void {
    this.mostrarModalEdit = true;
    console.log("Modal edit abierto");
  }

  cerrarModalEdit(): void {
    this.mostrarModalEdit = false;
    console.log("Modal edit cerrado");
  }  
  abrirModalDelete(): void {
    this.mostrarModalDelete = true;
    console.log("Modal Delete abierto");
  }

  cerrarModalDelete(): void {
    this.mostrarModalDelete = false;
    console.log("Modal Modal Delete cerrado");
  }

  public formatearFecha(fechaString:string) {
    // Convertir la cadena de fecha a un objeto Date
    var fecha = new Date(fechaString);

    // Días de la semana y meses en español
    var diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Obtener el día de la semana, el día del mes y el mes
    var diaSemana = diasSemana[fecha.getDay()];
    var diaMes = fecha.getDate();
    var mes = meses[fecha.getMonth()];
    var anio = fecha.getFullYear();

    // Construir la cadena de fecha formateada
    var fechaFormateada = diaSemana + ', ' + diaMes + ' de ' + mes + ' ' + anio;

    return fechaFormateada;
  }

 
}
