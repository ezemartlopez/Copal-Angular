
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ApiServicioService } from '../../servicios/api-servicio.service';
import { baseErrors, tieneErrores, validarFormulario, modificarFormulario} from '../crear-evento/validaciones';
import { encontrarNombrePorId } from '../crear-evento/funciones';
import { ActivatedRoute } from '@angular/router';
import {obtenerFechaYHora, buscarIdPorNombre, buscarObjetoPorId} from './funciones';
@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit{
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
  ubicacion: Ubicacion; // Permite que ubicacion sea null
  urlEncuentro: string; // URL para el encuentro

  /* DATOS IMPORTANTES */
  eventoSel: any | null;
  parametro: string = "";
  /* Opciones de formulario */
  opcionesTipoEvento:string[];
  opcionesDepartamentos: any[];
  opcionesProvincias: any[];
  opcionesLocalidades: any[];
  opcionesEstados:any[];
  localidadesDesabilitadas: boolean;
  /*Valores defecto */
  ubicacionDefecto: Ubicacion;
  selectUbicacion:any = {provincia:'', localidad:''};

  showModal:boolean = false;
  showError:boolean = false;
  textoCopiado: string = '';
  errores: any;
  provinciaSeleccionada: any;

  imagen: any;

  infoCargada:boolean;
  isLoadding:boolean;
  errorEvento:boolean;

  estadoEvento: any = 0;
  constructor(private api: ApiServicioService, private clipboard:Clipboard, private route: ActivatedRoute) {
    this.infoCargada = false;
    this.urlEncuentro = '';
    this.opcionesTipoEvento = ['VIRTUAL', 'PRESENCIAL', 'HIBRIDO']
    this.ubicacionDefecto = new Ubicacion('0','0','',0,0,0);
    this.ubicacion = this.ubicacionDefecto; // Puedes inicializarla como null si no se proporciona
    this.errores = baseErrors();
    this.opcionesDepartamentos = [];
    this.opcionesProvincias = [{id:0, nombre:'Ninguno'}];
    this.opcionesLocalidades = [{id:0, nombre:'Ninguno'}];
    this.opcionesEstados = [];
    this.localidadesDesabilitadas = true;
    this.isLoadding = true;
    this.errorEvento = false;
   // this.provinciaSeleccionada = {id:0, nombre:'Ninguno'};
  }
  ngOnInit(): void {
    this.obtenerEstados();
    this.obtenerProvincias();
  }

  obtenerId(){
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.parametro = id? id: "" ; // 'id' es el nombre del parámetro definido en la ruta
      console.log("Parametro: ", this.parametro);
    });
    this.obtenerEvento(parseInt(this.parametro))
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
      estado: this.estadoEvento
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

  mostrarModal(){ this.showModal = true; }
  ocultarModal(){ this.showModal = false; }
  mostrarErrorModal(){this.showError = true;}
  ocultarErrorModal(){this.showError = false;}
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
  cargarInformacion(){
    const [fechaFin, horaFin] = obtenerFechaYHora(this.eventoSel.fechaFin);
    const [fechaInicio, horaInicio] = obtenerFechaYHora(this.eventoSel.fechaInicio);
    // console.log('Fecha Inicio:', fechaInicio);
    // console.log('Hora Inicio:', horaInicio);
    // console.log('Fecha fin:', fechaFin);
    // console.log('Hora fin:', horaFin); 

    this.nombre = this.eventoSel.nombre;
    this.departamento = parseInt(this.eventoSel.departamento.id);
    this.flyer = this.eventoSel.flyer.urlPublica;
    this.urlInvitacion = this.eventoSel.urlInvitacion;
    this.descripcion = this.eventoSel.descripcion;
    this.fechaInicio = fechaInicio;
    this.horaInicio = horaInicio;
    this.fechaFin = fechaFin;
    this.horaFin = horaFin;
    this.urlEncuentro =this.eventoSel.urlEncuentro;
    this.estadoEvento = this.eventoSel.estado.id;

    this.tipoDeEvento = this.eventoSel.tipo;
    if(this.tipoDeEvento === 'VIRTUAL' || this.tipoDeEvento === 'HIBRIDO'){
      this.urlEncuentro = this.eventoSel.urlEncuentro;

      if(this.tipoDeEvento === 'VIRTUAL'){
        this.infoCargada = true; 
        this.isLoadding = false;

      }
    }
    if(this.tipoDeEvento === 'PRESENCIAL' || this.tipoDeEvento === 'HIBRIDO'){
      this.ubicacion.altura = this.eventoSel.ubicacion.altura;
      this.ubicacion.calle = this.eventoSel.ubicacion.calle;
      this.ubicacion.codigoPostal = this.eventoSel.ubicacion.codigoPostal;
      this.ubicacion.piso = this.eventoSel.ubicacion.piso;
      const idProvincia = buscarIdPorNombre(this.opcionesProvincias, this.eventoSel.ubicacion.provincia)
      this.ubicacion.provincia = '' + idProvincia;
      this.setearLocalidades(idProvincia, this.eventoSel.ubicacion.localidad);
      
    }
    //finalizo la carga
    
  }

  /*METODOS PARA FORMULARIOS */
  postEventoApi(datos: any){
    console.log('datos que se envian: ', datos);
    const id = parseInt(this.parametro);
    this.api.putEvento(
      id,
      datos,
      (response) => { console.log('Departamento creado exitosamente', response); this.postImagen(id) ; this.mostrarModal();},
      (error) => { console.error('Error al crear el departamento', error); this.mostrarErrorModal();}// Puedes manejar el error de la manera que desees
    );
  }
  /* METODOS GENERALES LLAMADAS API */
  obtenerDepartamentos(){
    this.api.getDepartamentos(
      (data) => { this.opcionesDepartamentos=data; console.log(data); },// Maneja los datos exitosos
      (error) => { console.error(error);}// Maneja el error (opcional)
    );
    this.obtenerId();
  }
  obtenerProvincias(){
    this.api.getProvincias(
      (data) => { this.opcionesProvincias= this.opcionesProvincias.concat(data); console.log(data); this.obtenerDepartamentos();  },// Maneja los datos exitosos
      (error) => { console.error(error);}// Maneja el error (opcional)
    ); 
  }
  obtenerLocalidades(id:any){
    console.log(id);
    this.api.getLocalidades(
      id,
      (data) => { this.opcionesLocalidades= this.opcionesLocalidades.concat(data); console.log(data); this.localidadesDesabilitadas = false;},// Maneja los datos exitosos
      (error) => { console.error(error);}// Maneja el error (opcional)
    );  
  }
  obtenerEvento(id:any){
    this.api.getEvento(
      id,
      (data) => { this.eventoSel = data; console.log("Evento:\n", this.eventoSel); this.cargarInformacion();},// Maneja los datos exitosos
      (error) => { console.error(error); this.errorEvento = true; this.isLoadding = false;}// Maneja el error (opcional)
    );
  }
  obtenerEstados(){
    this.api.getEstados(
      (data) => { this.opcionesEstados=data;  console.log(data);},// Maneja los datos exitosos
      (error) => { console.error(error);}// Maneja el error (opcional)
    ); 
  }
  setearLocalidades(id:any, localidad:string){
    console.log(id);
    this.api.getLocalidades(
      id,
      (data) => { 
        this.opcionesLocalidades=data; 
        console.log(data); 
        const idLocalidad = buscarIdPorNombre(this.opcionesLocalidades, localidad)
        this.localidadesDesabilitadas = false;
        this.ubicacion.localidad = '' + idLocalidad
        this.infoCargada = true; 
        this.isLoadding = false;},// Maneja los datos exitosos
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
  constructor(provincia:string, localidad:string, calle:string, altura:number, piso:number, codigoPostal:number) {
    this.provincia=provincia;
    this.localidad=localidad;
    this.calle=calle;
    this.altura=altura;
    this.piso=piso;
    this.codigoPostal=codigoPostal;
  }
}

