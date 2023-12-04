import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.css']
})
export class ViewModalComponent {
  @Input() showModal: boolean = false;
  @Input() infoReservas:any;
  @Output() closeModal = new EventEmitter<void>();

  
  estado:number;
  fechaFormateada:string;
  constructor(){
    this.estado=0;
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
  cerrarModal(): void {
    this.showModal = false;
    this.closeModal.emit();
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
