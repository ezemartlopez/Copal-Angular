import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Formulario, Campo } from './modelos/modelos';
import { esRequerido, validarEmail, invalidaHoraFin, adecuarRespuesta, validarFecha, esHoraValida, esFechaValida} from './modelos/validacionesModelo';
import {ApiServiceService} from './Servicios/api-service.service'
import { json } from 'stream/consumers';
@Component({
  selector: 'app-formulario-reservacion',
  templateUrl: './formulario-reservacion.component.html',
  styleUrls: ['./formulario-reservacion.component.css']
})
export class FormularioReservacionComponent implements OnInit {
  showModal:boolean;
  showError: boolean;
  isLoadding: boolean;
  formulario: Formulario;
  //Opciones listas
  opcionesEspacios: any[] = [];
  opcionesRecursos: any[] = [];
  opcionesDepartamentos: any[] = [];

  inputCodigo:string = 'Codigo Reserva 123';
  selectedOptions: number[] = [];
  showOptions = false;
  textoCopiado = false;

  constructor(private clipboard:Clipboard, private api: ApiServiceService) {
    this.showModal = false;
    this.showError = false;
    this.isLoadding = false;
    //formulario
    this.formulario = new Formulario({
      espacio:new Campo("espacio", '', [esRequerido]),
      departamento:new Campo("departamento", '', [esRequerido]),
      fecha:new Campo("fecha", '', [esRequerido, validarFecha]),
      mail: new Campo("mail", '', [esRequerido, validarEmail]),
      nombre: new Campo("nombre", '', [esRequerido]),
      horaInicio: new Campo("horaInicio", '', [esRequerido]),
      horaFin: new Campo("horaFin", '', [esRequerido],'horaInicio'),
      descripcion: new Campo('descripcion', '',[])
    });
  }
  ngOnInit(): void {
    this.obtenerEspacios();
    this.obtenerRecursos();
    this.obtenerDepartamentos();
  }

  //Llamadas a la api
  obtenerEspacios(){
    this.api.obtenerEspacios(
      (data)=>{ this.opcionesEspacios = data; },
      ()=>{ this.opcionesEspacios = []; }
    );
  }
  obtenerRecursos(){
    this.api.obtenerRecursos(
      (data)=>{ this.opcionesRecursos = data; },
      ()=>{ this.opcionesRecursos = []; }
    );
  }
  obtenerDepartamentos(){
    this.api.obtenerDepartamentos(
      (data)=>{ this.opcionesDepartamentos = data; },
      ()=>{ this.opcionesDepartamentos = []; }
    );
  }
  solicitudReserva(reserva: any){
    
    this.api.crearReserva(
      reserva,
      response => {
        // Maneja la respuesta exitosa aquí
        console.log('Reserva creada exitosamente:', response);
        this.inputCodigo = response.codigo;
        this.showModal = true;
      },
      () => {
        // Maneja el error aquí
        console.error('Error al crear la reserva.');
        this.showError = true;
      }
    );
      this.isLoadding = false;
  }
  //Funciones de la clase
  enviarFormulario(){
    this.isLoadding = true;
    
    if(this.formulario.esValido()){
      let reserva = JSON.parse(this.formulario.obtenerRespuestaJSON());
      reserva = { ...reserva, recursos: this.selectedOptions };
      reserva = adecuarRespuesta(reserva); 
      this.solicitudReserva(reserva);
    }
    else{
      this.isLoadding = false;
    }
    
  }
  closeModal(){ this.showModal = false; this.formulario.reiniciarValores(); this.cerrarOpciones();}
  closeError(){ this.showError = false; }
  toggleOption(optionId: number): void {
    // Verifica si la opción ya está seleccionada
    const index = this.selectedOptions.indexOf(optionId);
    // Si la opción ya está seleccionada, quítala de la lista, de lo contrario, agrégala
    if (index !== -1) { this.selectedOptions.splice(index, 1);} 
    else { this.selectedOptions.push(optionId); }
  }
  existeOpcion(id:number){ return this.selectedOptions.includes(id); }

  toggleOptions(): void { this.showOptions = !this.showOptions; }

  cerrarOpciones(){ this.selectedOptions = []; this.showOptions = false; }

  copiarPortapapeles(){
    this.textoCopiado = true;
    this.clipboard.copy(this.inputCodigo);
    setTimeout(() => { this.textoCopiado = false;}, 1000); // Espera un segundo (1000 ms)
  }

  esHoraFinInvalida(horaInicio: string, horaFin: string): boolean {
    if (esHoraValida(horaInicio) && esHoraValida(horaFin)) {
      const horaInicioDate = new Date(`2000-01-01T${horaInicio}`);
      const horaFinDate = new Date(`2000-01-01T${horaFin}`);
      // Devuelve true si la horaFin es menor o igual a la horaInicio
      return horaFinDate <= horaInicioDate;
    }
    // Devuelve false si alguna de las horas no es válida
    return false;
  }
  esHoraInicioInvalida(fecha: string, horaInicio: string): boolean {
    if (esFechaValida(fecha) && esHoraValida(horaInicio)) {
      const fechaSeleccionada = new Date(`${fecha}T${horaInicio}`);
      const fechaHoy = new Date();
      
      // Verifica si la fecha es hoy y la hora de inicio es menor o igual a la hora actual
      if (fechaSeleccionada.toDateString() === fechaHoy.toDateString() && fechaSeleccionada <= fechaHoy) {
        return true; // La hora de inicio es menor o igual a la hora actual en el día de hoy
      }
    }
  
    return false; // Devuelve false si la fecha o la hora no son válidas
  }
}
