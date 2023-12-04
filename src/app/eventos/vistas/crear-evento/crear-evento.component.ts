
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ApiServicioService } from '../../servicios/api-servicio.service';
import { baseErrors, tieneErrores, validarFormulario, modificarFormulario} from './validaciones';
import { encontrarNombrePorId } from './funciones';
@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit{
  /* Variables de formulario */
  flyer: string = ''; // URL de la imagen del flyer
  nombre: string = '';
  descripcion: string = '';
  fechaInicio: string = ''; // Formato 'dd/mm/yyyy '
  horaInicio: string = '';// Formato hh:mm:ss
  fechaFin: string = ''; // Formato 'dd/mm/yyyy '
  horaFin: string = '';// Formato hh:mm:ss
  urlInvitacion: string = ''; // URL para invitación
  departamento: number = 0; // ID del departamento
  tipoDeEvento: string = 'Ninguno'; // Por ejemplo, 'HIBRIDO'
  ubicacion: Ubicacion | null; // Permite que ubicacion sea null
  urlEncuentro: string | null; // URL para el encuentro
  /* Opciones de formulario */
  opcionesTipoEvento:string[];
  opcionesDepartamentos: any[];
  opcionesProvincias: any[];
  opcionesLocalidades: any[];
  localidadesDesabilitadas: boolean;
  /*Valores defecto */
  ubicacionDefecto: Ubicacion;
  selectUbicacion:any = {provincia:'', localidad:''};

  imagen: any;  
  showModal:boolean = false;
  showError:boolean = false;
  textoCopiado: string = '';
  errores: any;
  idEventoCreado: number = 0;
  constructor(private api: ApiServicioService, private clipboard:Clipboard) {
    this.ubicacion = null; // Puedes inicializarla como null si no se proporciona
    this.urlEncuentro = null;
    this.horaFin = 'Ninguno';
    this.horaInicio = 'Ninguno';
    this.opcionesTipoEvento = ['Ninguno','VIRTUAL', 'PRESENCIAL', 'HIBRIDO']
    this.ubicacionDefecto = new Ubicacion;
    this.errores = baseErrors();
    this.opcionesDepartamentos = [{id:0, nombre:'Ninguno'}];
    this.opcionesProvincias = [{id:0, nombre:'Ninguno'}];
    this.opcionesLocalidades = [{id:0, nombre:'Ninguno'}];
    this.localidadesDesabilitadas = true;
  }
  ngOnInit(): void {
      this.obtenerDepartamentos();
      this.obtenerProvincias();
  }
  redireccionar(url:string){
    window.location.href = url;
  }
  enviarFormulario() {
    let formulario = {
      flyer:this.flyer,
      nombre:this.nombre,
      descripcion:this.descripcion,
      fechaInicio:this.fechaInicio,
      horaInicio:this.horaInicio,
      fechaFin:this.fechaFin,
      horaFin:this.horaFin,
      urlInvitacion:this.urlInvitacion,
      departamento:this.departamento,
      tipoEvento:this.tipoDeEvento,
      ubicacion:this.ubicacion,
      urlEncuentro:this.urlEncuentro,
    };
    //validando los errores del formulario
    this.errores = validarFormulario(formulario);
    console.log("tiene errores: ", tieneErrores(this.errores));
    
    console.log("Formulario Antes: ",formulario);
    console.log("Formulario Despues: ",modificarFormulario(formulario));
    if(!tieneErrores(this.errores)){
      
      if(formulario.ubicacion){
        formulario.ubicacion.provincia = encontrarNombrePorId(this.opcionesProvincias, parseInt(formulario.ubicacion.provincia))
        formulario.ubicacion.localidad = encontrarNombrePorId(this.opcionesLocalidades, parseInt(formulario.ubicacion.localidad))
      }
      this.postEventoApi(modificarFormulario(formulario));
    }
  }
  provinciaCambiada(id: any){
    this.opcionesLocalidades=[{id:0, nombre:'Ninguno'}];
    this.obtenerLocalidades(id);
  }
  valorCambiadoTipoEvento(){
    if(this.tipoDeEvento === "VIRTUAL"){//Virtual
      this.urlEncuentro = '';
      this.ubicacion = null;
    }
    if(this.tipoDeEvento === "PRESENCIAL"){//Presencial
      this.ubicacion = this.ubicacionDefecto;
      this.urlEncuentro = null;
    }
    if(this.tipoDeEvento === "HIBRIDO"){//Hibrido
      this.ubicacion = this.ubicacionDefecto;
      this.urlEncuentro = '';
    }
  }
  mostrarModal(){ this.showModal = true; }
  ocultarModal(){ this.showModal = false; }
  copiarPortapapeles(){
    this.clipboard.copy(this.urlInvitacion);
    this.textoCopiado = 'Copiado al Portapapeles..'
    setTimeout(() => { this.textoCopiado = '';}, 1000); // Espera un segundo (1000 ms)
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

  redirigirAlEvento(){
    this.redireccionar('/eventos/ver-evento/' + this.idEventoCreado);
  }

  /*METODOS PARA FORMULARIOS */
  postEventoApi(datos: any){
    this.api.postEvento(
      datos,
      (response) => { console.log('Departamento creado exitosamente', response); this.urlInvitacion = response.urlInvitacion; this.idEventoCreado = response.id; this.postImagen(this.idEventoCreado); this.mostrarModal();},
      (error) => { console.error('Error al crear el departamento', error); }// Puedes manejar el error de la manera que desees
    );
  }
  /* METODOS GENERALES LLAMADAS API */
  obtenerDepartamentos(){
    this.api.getDepartamentos(
      (data) => { this.opcionesDepartamentos=this.opcionesDepartamentos.concat(data); console.log(data); },// Maneja los datos exitosos
      (error) => { console.error(error);}// Maneja el error (opcional)
    );
  }
  obtenerProvincias(){
    this.api.getProvincias(
      (data) => { this.opcionesProvincias=this.opcionesProvincias.concat(data);  console.log(data);},// Maneja los datos exitosos
      (error) => { console.error(error);}// Maneja el error (opcional)
    );   
  }
  obtenerLocalidades(id:any){
    console.log(id);
    this.api.getLocalidades(
      id,
      (data) => { this.opcionesLocalidades=this.opcionesLocalidades.concat(data); console.log(data); this.localidadesDesabilitadas = false;},// Maneja los datos exitosos
      (error) => { console.error(error);}// Maneja el error (opcional)
    ); 
     
  }

  onFileSelected(event: any): void {
    this.imagen = event.target.files[0];
  }

  postImagen(id : number){
    if (this.imagen) {
      this.api.subirImagen(id,this.imagen).subscribe(
        (response) => {
          console.log('Imagen subida exitosamente', response);
        },
        (error) => {
          console.error('Error al subir la imagen', error);
        }
      );
    }
  }
  
}

class Ubicacion {
  provincia: string;
  localidad: string;
  calle: string;
  altura: number;
  piso: number;
  codigoPostal: number;
  constructor() {
    this.provincia='0';
    this.localidad='0';
    this.calle='';
    this.altura=0;
    this.piso=0;
    this.codigoPostal=0;
  }
}

