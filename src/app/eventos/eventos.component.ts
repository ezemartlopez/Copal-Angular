import { Component, OnInit } from '@angular/core';
import { ApiServicioService } from './servicios/api-servicio.service';
import { construirParametrosURL} from './funciones';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit{
  eventosCopal: any[];
  loadding: boolean;
  infoCargada: boolean;
  seAplicoFiltro: boolean;
  //Opciones
  opcionesDepartamentos: any[];
  opcionesEstados: any[];
  opcionesTipoEvento: any[];
  //Formulario
  selectDepartamento:number;
  selectEstado: number;
  selectModalidad: string;
  inputNombre: string;
  //Paginable
  totalPaginas: number;
  paginaActual: number;
  constructor(private api: ApiServicioService) {
    this.opcionesTipoEvento = ['VIRTUAL', 'PRESENCIAL', 'HIBRIDO'];
    this.opcionesDepartamentos = [];
    this.opcionesEstados = [];
    this.eventosCopal = [];  
    this.loadding = true;
    this.infoCargada = false;
    this.seAplicoFiltro = false;
    this.selectDepartamento = 0;
    this.selectEstado = 0;
    this.selectModalidad = 'Por Modalidad';
    this.inputNombre = '';
    this.totalPaginas = 0;
    this.paginaActual = 0;
  }
  ngOnInit(): void {
      this.obtenerEventosCopal();
      this.obtenerDepartamentos();
      this.obtenerEstados();
  }
  redireccionar(url:string){
    window.location.href = url;
  }
  hayEventos(){
    return this.eventosCopal.length !== 0;
  }
  enviarFiltros(){
    this.seAplicoFiltro = true;
//    console.log('dep:',this.selectDepartamento,'est:', this.selectEstado,'mod:', this.selectModalidad,'input: ', this.inputNombre);
    this.obtenerEventosCopalFiltrados();
  }
  resetearFiltros(){
    this.selectDepartamento = 0;
    this.selectEstado = 0;
    this.selectModalidad = 'Por Modalidad';
    this.obtenerEventosCopal();
  }
  /* ################################# LLAMADAS A LA API ############################################## */
  //LLAMADA EVENTOS FILTRADOS
  obtenerEventosCopalFiltrados(){
    this.loadding = true;
    let filtros = construirParametrosURL(this.selectDepartamento, this.selectModalidad, this.selectEstado);
    console.log('filtros: ',filtros);
    this.api.getEventosCopalFilter(
      filtros,
      (data) => { 
        this.eventosCopal = data.content;  console.log(data.content); this.loadding = false;this.infoCargada = true;
        this.totalPaginas = data.totalPages; this.paginaActual = data.number;
      },// Maneja los datos exitosos
      (data) => {this.eventosCopal = data; this.loadding = false;},//Manejo la carga de datos en caso de error.
      (error) => { console.error(error);}// Maneja el error (opcional)
    ); 
  }

  /* OBTENGO LOS EVENTOS DE COPAL */
  obtenerEventosCopal(){
    this.loadding = true;
    this.api.getEventosCopal(
      (data) => { 
        this.eventosCopal = data.content;  console.log(data.content); this.loadding = false;this.infoCargada = true;
        this.totalPaginas = data.totalPages; this.paginaActual = data.number;
      },// Maneja los datos exitosos
      (data) => {this.eventosCopal = data; this.loadding = false;},//Manejo la carga de datos en caso de error.
      (error) => { console.error(error);}// Maneja el error (opcional)
    ); 
  }
  /* OBTENTGO LOS ESTADOS DE LOS EVENTOS */
  obtenerEstados(){
    this.api.getEstados(
      (data) => { this.opcionesEstados=data;  console.log(data);},// Maneja los datos exitosos
      (error) => { console.error(error);}// Maneja el error (opcional)
    ); 
  }
  /* OBTENGO LOS DEPARTAMENTOS */
  obtenerDepartamentos(){
    this.api.getDepartamentos(
      (data) => { this.opcionesDepartamentos=data; console.log(data); },// Maneja los datos exitosos
      (error) => { console.error(error);}// Maneja el error (opcional)
    );
  }
  /*  llamar a pagina */
  llamarPagina(pagina:number){
    this.loadding = true;
    let url = construirParametrosURL(this.selectDepartamento,this.selectModalidad, this.selectEstado);
    url = url === ''? `page=${pagina}`: `&page=${pagina}`;
    url = '?' + url;
    console.log('pagina:',url);
    
    this.api.getPage(
      this.seAplicoFiltro,
      url,
      (data) => { 
        this.eventosCopal = data.content;  console.log(data.content); this.loadding = false;this.infoCargada = true;
        this.totalPaginas = data.totalPages; this.paginaActual = data.number;
      },// Maneja los datos exitosos
      (data) => {this.eventosCopal = data; this.loadding = false;},//Manejo la carga de datos en caso de error.
      (error) => { console.error(error);}// Maneja el error (opcional)
    ); 
  }
}
