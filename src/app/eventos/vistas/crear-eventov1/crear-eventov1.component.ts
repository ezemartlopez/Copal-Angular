import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-crear-eventov1',
  templateUrl: './crear-eventov1.component.html',
  styleUrls: ['./crear-eventov1.component.css']
})
export class CrearEventov1Component implements OnInit{
  opcionesTipoEvento:string[];
  opcionesDepartamentos: any[];
  opcionesProvincias: any[];
  opcionesLocalidades: any[];
  localidadesDesabilitadas: boolean;

  urlInvitacion: string = ''; // URL para invitación
  showModal:boolean = false;
  textoCopiado: string = '';

  eventoForm: FormGroup;
  constructor(private clipboard:Clipboard, private formBuilder: FormBuilder) {
    this.opcionesDepartamentos = [{id:0, nombre:'Ninguno'},{id:1, nombre:"Depto 1"}];
    this.opcionesLocalidades = [];
    this.opcionesTipoEvento = [];
    this.opcionesProvincias = [];
    this.localidadesDesabilitadas = true;

    /* Formulario */
    this.eventoForm = this.formBuilder.group({
      flyer: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      horaInicio: ['', [Validators.required, this.validateHoraInicio]],
      fechaFin: ['', [Validators.required,this.validateFechaFin]],
      horaFin: ['', [Validators.required, this.validateHoraFin]],
      urlInvitacion: [''],
      departamento: [0, this.validateDepartamento],
      tipoDeEvento: ['Ninguno'],
      ubicacion: this.formBuilder.group({
        provincia: [null],
        localidad: [null],
        calle: [''],
        altura: [null],
        piso: [null],
        codigoPostal: [null]
      }),
      urlEncuentro: ['']
    });
  }

  ngOnInit(): void {
      
  }

  redireccionar(url:string){
    window.location.href = url;
  }
  generarTiempos(): string[] {
    const tiempos: string[] = ['Ninguno'];

    for (let hora = 0; hora < 24; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horaStr = hora.toString().padStart(2, '0');
        const minutoStr = minuto.toString().padStart(2, '0');
        const segundoStr = '00'; // Los segundos siempre son 00 en este caso
        tiempos.push(`${horaStr}:${minutoStr}:${segundoStr}`);
      }
    }

    return tiempos;
  }
  mostrarModal(){ this.showModal = true; }
  ocultarModal(){ this.showModal = false; }
  copiarPortapapeles(){
    this.clipboard.copy(this.urlInvitacion);
    this.textoCopiado = 'Copiado al Portapapeles..'
    setTimeout(() => { this.textoCopiado = '';}, 1000); // Espera un segundo (1000 ms)
  }
  enviarFormulario() {
    console.log(this.eventoForm);
    
    if (this.eventoForm.valid) {
      const formData = this.eventoForm.value;
      // Envía formData al servidor o realiza las acciones necesarias
    }
    else{
      console.log('Formulario Invalido');
      console.log(this.eventoForm.errors);
      
    }
  }
  validateDepartamento(control: AbstractControl) {
    if (control.value === 0) {
      return { invalidDepartamento: true };
    }
    return null;
  }
  // Función de validación personalizada para la fecha de fin
  validateFechaFin(control: AbstractControl) {
      const fechaInicio = new Date(control.root.get('fechaInicio')?.value);
      const fechaFin = new Date(control.value);
  
      if (fechaFin <= fechaInicio) {
        return { invalidFechaFin: true };
      }
  
      return null;
    }
// Función de validación personalizada para la hora de inicio
validateHoraInicio(control: AbstractControl) {
  const horaInicio = control.value;
  const horaFin = control.root.get('horaFin')?.value;

  if (horaInicio && horaFin && horaInicio >= horaFin) {
    return { invalidHoraInicio: true };
  }

  return null;
}

// Función de validación personalizada para la hora de finalización
validateHoraFin(control: AbstractControl) {
  const horaFin = control.value;
  const horaInicio = control.root.get('horaInicio')?.value;

  if (horaFin && horaInicio && horaFin <= horaInicio) {
    return { invalidHoraFin: true };
  }

  return null;
}
}



interface Ubicacion {
  provincia: number;
  localidad: number;
  calle: string;
  altura: number;
  piso: number;
  codigoPostal: number;
}
