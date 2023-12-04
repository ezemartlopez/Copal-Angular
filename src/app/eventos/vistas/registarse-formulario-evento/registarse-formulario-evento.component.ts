import { Component,OnInit  } from '@angular/core';
import {ApiServicioService} from '../../servicios/api-servicio.service'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Evento{
  id: number,
  flyer: Imagen,
  nombre: string,
  fechaHoraInicio: string,
  urlInvitacion: string,
  departamento: string,
  ubicacion: string,
  estado: string
}
export interface Imagen {
  urlPublica : string;
}
export interface Usuario{
  id:number,
  nombre:string
}
export interface FormularioRegristroEnviar{
  nombre: string,
  apellido: string,
  email: string,
  organizacion: string,
  invitadoPor: number //id usuario
}

@Component({
  selector: 'app-registarse-formulario-evento',
  templateUrl: './registarse-formulario-evento.component.html',
  styleUrls: ['./registarse-formulario-evento.component.css']
})

export class RegistarseFormularioEventoComponent implements OnInit {
  eventoCompleto: any;
  imagen:Imagen;
  codigo: string;
  eventoAsociado: Evento;
  campos = ['input','input1', 'input2', 'input3','input4'];
  formularioRegistro: FormularioRegristroEnviar;
  usuariosObtenidos:Array<Usuario>;
  isLoadding: boolean;
  exito: boolean;
  error: boolean;
  miFormulario: FormGroup;
  valorEmail: string = '';
  listaSocios:any;
  otraOrganizacion: string;
  constructor(private servicioAPI:ApiServicioService, private route: ActivatedRoute,private fb: FormBuilder){
    this.eventoCompleto= {
    };
    this.imagen={
      urlPublica:""
    };
    this.eventoAsociado = {
      id:2,
      flyer:{
        urlPublica:""
      },
      nombre:"",
      fechaHoraInicio:"",
      urlInvitacion:"",
      departamento:"",
      ubicacion:"",
      estado:""
    };
    this.codigo = '';
    this.isLoadding = true;
    this.usuariosObtenidos=[]
    this.formularioRegistro = {
      nombre: '',
      apellido: '',
      email: '',
      organizacion: '',
      invitadoPor:0 // Puedes asignar el valor correcto según tu lógica
    };
    //
    this.exito = false;
    this.error = false;
    this.miFormulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.otraOrganizacion="";
  }
  

  ngOnInit(): void {
    this.getUsuarios();
    this.obtenerId();
    this.getSocios();
  }
  obtenerId(){
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.codigo = id? id: "" ; // 'id' es el nombre del parámetro definido en la ruta
      console.log("Codigo: ", this.codigo);
      
    });
    //Llamo al evento
    this.getEvento();
    
  }
  isVisible = true; // Inicialmente visible

  // Método para cambiar la visibilidad
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  enviarDatos() {
    const hayCampoInvalido = this.campos.some(id => this.esCampoInvalido(id));
    if (hayCampoInvalido) {
      console.log('Al menos un campo está vacío. No se pueden enviar los datos.');
    } else {
      // Todos los campos están llenos, puedes enviar los datos y hacer el  servicio POST al 
      //backend
      this.isVisible = false;
      console.log('Todos los campos están llenos. Enviar datos...');
      if(this.formularioRegistro.organizacion=="otra"){
        this.formularioRegistro.organizacion=this.otraOrganizacion;
      }
      console.log(this.formularioRegistro);
      this.servicioAPI.postRegistro(this.formularioRegistro, this.eventoAsociado.id,
        (response) => {
          // Manejar la respuesta exitosa aquí
          console.log('Registro exitoso:', response);
          this.exito = true;
        },
        (error) => {
          // Manejar el error aquí
          console.error('Error al registrar participante:', error);
          this.error = true;
        }
      );
    }
  }
 
  regresar(){
    window.location.href = '/eventos';
  }
  esCampoInvalido(id: string): boolean {
    const valorInput = (document.getElementById(id) as HTMLInputElement).value;
    return valorInput.trim() === '';
  }
  getUsuarios() {
    this.servicioAPI.getUsuarios(
      (data) => {
        // Manejar los datos obtenidos del servicio aquí
        this.usuariosObtenidos=data;
      },
      (error) => {
        // Manejar el error aquí si es necesario
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
  
  obtenerhora(fecha:string){
    let arreglo=[];
    arreglo=fecha.split('T');
    return arreglo[1].slice(0,-3);
  }
  getEvento() {
    this.servicioAPI.getEventoPorCodigo(
      this.codigo,
      (data) => {
        // Manejar los datos obtenidos del servicio aquí
        console.log('evento:', data);
        this.eventoAsociado=data;
        this.getEventoCompleto(this.eventoAsociado.id);
      },
      (error) => {
        // Manejar el error aquí si es necesario
        console.error('Error al obtener el evento:', error);
      }
    );
    this.isLoadding = false;
  } 
  enviarFormulario(data:any, id:number){
    this.servicioAPI.postRegistro(
      data, 
      id,
      (response) => {
        console.log('Se envio el formulario con exito', response);
        
      },
      (error) => {
        console.error('Error al enviar el registro', error);
        
      }
      );
  } 
 
  getEventoCompleto(id:number){
    this.servicioAPI.getEvento(id, 
      (response) => {
        // Manejar la respuesta exitosa aquí
        console.log('Evento Completo:', response);
        this.eventoCompleto=response;
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener el evento:', error);
      }
    );
  }
  isValidEmail(email: string): boolean {
    // Puedes agregar aquí tu lógica personalizada de validación de correo electrónico
    // Por ahora, simplemente verifica si contiene un '@'
    return email.includes('@');
  }
  getSocios() {
    this.servicioAPI.getSocios(
      (data) => {
        // Manejar los datos obtenidos del servicio aquí
        this.listaSocios=data;
        console.log("listado de socios : ",this.listaSocios);
      },
      (error) => {
        // Manejar el error aquí si es necesario
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
}















