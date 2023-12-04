import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiServicioService} from '../../servicios/api-servicio.service';
//Creamos las interfaces que utilizaremos
export interface Fecha{
  inicio:string,
  fin:string
}
export interface Rol {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  rol: string;
}
export interface TipoUsuario {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  nombreTipoUsuario: string;
}
export interface Ubicacion {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  calle: string;
  altura: number;
  codigoPostal: number;
  piso: number;
  provincia: string;
  localidad: string;
}
export interface Usuario {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  nickName: string;
  nombre: string;
  apellido: string;
  tipoDeUsuario:TipoUsuario;
  nombreCompleto: string;
}
export interface Autoridad {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  rol: Rol;
  usuario: Usuario;
}

export interface Departamento {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  icono: string;
  nombreDeDepartamento: string;
  descripcion: string;
  autoridades: Autoridad[];
  usuariosAsociados: any[]; // Puedes especificar el tipo correcto si es necesario
}

export interface Participante {
  nombre: string,
  apellido:string,
  organizacion: string,
  email:string,
}
export interface Imagen {
  urlPublica : string;
}
export interface Evento {
  id: number;
  fechaCreacion: string;
  fechaBaja: string | null;
  flyer: Imagen;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  tipo: string;
  urlInvitacion: string;
  urlEncuentro: string;
  participantes: Array<Participante>; // Puedes especificar el tipo correcto si es necesario
  departamento: Departamento;
  estado:{
    id: number;
    fechaCreacion: string;
    fechaBaja: string | null;
    nombre: string;
  };
  ubicacion: Ubicacion;
}

@Component({
  selector: 'app-ver-evento',
  templateUrl: './ver-evento.component.html',
  styleUrls: ['./ver-evento.component.css']
})

export class VerEventoComponent implements OnInit {
  parametro: string;
  loading = true;
  evento: any;
  eventoProximo: any;
  constructor(private route: ActivatedRoute, private api:ApiServicioService) {
    //para capturar el id de la ruta donde estamos y pedir con un get el evento segun id
    this.parametro="";
    // Inicialización del objeto evento
    this.evento = null;
  
  }

  ngOnInit(): void {
    this.obtenerId();
  }
  public obtenerId(){
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.parametro = id? id: "" ; // 'id' es el nombre del parámetro definido en la ruta
      console.log("Parametro: ", this.parametro);
    });
    //se llama al proximo - llamar evento por su ID
    this.getEvento(parseInt(this.parametro));
  }
  public getEvento(id:number){
    this.api.getEvento(id, 
      (response) => {
        // Manejar la respuesta exitosa aquí
        console.log('Evento obtenido:', response);
        this.evento=response;
        //this.setearFechasYHoras();
        this.loading = false;
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener el evento:', error);
      }
    );
  }
  listarParticipante(){
    return this.evento.participantes;
  }
  /* eliminarParticipante(id:string){
    this.evento.participantes = this.evento.participantes.filter(usuario => usuario.nombre !== id);
    console.log("Se elimino el usuario: ", id);
  } */
  getClasePorEstado(estado: string): string {
    if (estado === 'aceptado') {
      return 'estado-aceptado';
    } else if (estado === 'pendiente') {
      return 'estado-pendiente';
    } else {
      return 'estado-rechazado';
    }
  }
  private obtenerhora(fecha:string){
    let arreglo=[];
    arreglo=fecha.split('T');
    return arreglo[1].slice(0,-3);
  }
  private obtenerfecha(fecha:string){
    let arreglo=[];
    arreglo=fecha.split('T');
    return arreglo[0];
  }

  //remover cuando se arregle
  linkImagen(): string {
    return this.evento.flyer.urlPublica.replace('utn', '');
  }

  /* setearFechasYHoras(){
    this.horaInicio=this.obtenerhora(this.evento.fechaInicio);
    console.log(this.horaInicio);
    this.horaFin=this.obtenerhora(this.evento.fechaFin);
    console.log(this.horaFin);
    this.fechaInicio=this.obtenerfecha(this.evento.fechaInicio);
    this.fechaFin=this.obtenerfecha(this.evento.fechaFin);

    this.identificarEventoProximo();
  } */

  identificarEventoProximo(){
    const fechaHora1 = new Date(this.evento.fechaInicio);
    const fechaHora2 = new Date();

    const diferenciaMilisegundos = Math.abs(fechaHora1.getTime() - fechaHora2.getTime());
    
    const limite24Horas = 24 * 60 * 60 * 1000;

    this.eventoProximo = diferenciaMilisegundos < limite24Horas;
  }
}


