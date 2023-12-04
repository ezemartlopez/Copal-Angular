import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formulario, Campo, esRequerido, usuarioValido, rolValido} from './modelo'
import { ApiServiceService} from './api-service.service'


@Component({
  selector: 'app-formulario-departamento',
  templateUrl: './formulario-departamento.component.html',
  styleUrls: ['./formulario-departamento.component.css']
})
export class FormularioDepartamentoComponent implements OnInit{
    formulario: Formulario;
    autoridades: Formulario;
    usuariosForm: Formulario;
    listaAutoridades: any[];
    listaUsuarios: any[];
    usuarios: any[];
    roles: any[];
    showModal: boolean;
    exitoEnvio: boolean;
    fallaEnvio: boolean;
    idGrupo: number;
    nombreGrupo: string;
    /* Imagen */
    icono : any;
    selectedImage: File | null = null;

    constructor(private route: ActivatedRoute, private api: ApiServiceService){//usuarios
      this.idGrupo = 0;
      this.nombreGrupo = '';
      this.formulario = new Formulario({
        nombreDeDepartamento:new Campo("nombreDeDepartamento", '', [esRequerido]),
        descripcion:new Campo("descripcion", '', [esRequerido]),
      });
      this.autoridades = new Formulario({
        usuarioId:new Campo("usuarioId", '0', [esRequerido, usuarioValido]),
        rolId:new Campo("rolId", '1', [esRequerido, rolValido]),
      });
      this.usuariosForm = new Formulario(
        {usuarioId:new Campo("usuarioId", '0', [esRequerido, usuarioValido])}
      );
      this.usuarios = [];
      this.roles = [];
      this.listaAutoridades = [];
      this.listaUsuarios = [];
      this.showModal = false;
      this.exitoEnvio = false;
      this.fallaEnvio = false;
    }
  
    ngOnInit(): void {
      this.obtenerId();
      this.obtenerUsuarios();
      this.obtenerRoles();
    }

  private obtenerId(){
    this.route.paramMap.subscribe(params => {
      let id = params.get('id'); 
      this.idGrupo = id === null? 0 : parseInt(id);
      console.log("Parametro: ", this.idGrupo);
      this.obtenerNombreGrupo(this.idGrupo);
      });
  }
  /* AUTORIDADES FUNCIONES */
  agregarUsuario(){
    if (this.usuariosForm.esValido()) {
      console.log('Agregando usuario: ', this.usuariosForm.campos['usuarioId'].valorInicial);
      this.listaUsuarios.push(parseInt(this.usuariosForm.campos['usuarioId'].valorInicial));
      this.usuariosForm.reiniciarValores();
      this.usuariosForm.campos['usuarioId'].valorInicial = '0';
    }
  }
  agregarAutoridad(){
    if (this.autoridades.esValido()) {
      console.log('Agregando usuario');
      this.listaAutoridades.push({usuarioId: parseInt(this.autoridades.campos['usuarioId'].valorInicial), rolId: parseInt(this.autoridades.campos['rolId'].valorInicial)})
      this.reiniciarFormularioAutoridades();
    }
  }
  buscarUsuarioPorId(idBuscado: number): string {
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.id === idBuscado);
    return usuarioEncontrado? usuarioEncontrado.nombre: 'No encontrado';
  }
  buscarRolPorId(idBuscado: number): string {
    const usuarioEncontrado = this.roles.find(rol => rol.id === idBuscado);
    return usuarioEncontrado? usuarioEncontrado.rol: 'No encontrado';
  }
  eliminarUsuarioPorIdYRol(usuarioId: number, rolId: number): void {
    const nuevaLista = this.listaAutoridades.filter(usuarioRol => !(usuarioRol.usuarioId === usuarioId && usuarioRol.rolId === rolId));
    this.listaAutoridades = nuevaLista;
  }
  eliminarUsuarioPorId(usuarioId: number): void {
    const nuevaLista = this.listaUsuarios.filter(usuarioRol => !(usuarioRol.usuarioId === usuarioId));
    this.listaUsuarios = nuevaLista;
  }
  reiniciarFormularioAutoridades(){
    this.autoridades.reiniciarValores();
    this.autoridades.campos['usuarioId'].valorInicial = '0';
    this.autoridades.campos['rolId'].valorInicial = '1';
  }
  /* FIN AUTORIDADES FUNCIONES */
  /* GRUPO FUNCIONES */
  enviarFormularioGrupo(){
    if(this.formulario.esValido()){
      console.log('Formulario Valido');
      let depto = this.formulario.obtenerObjeto();
      depto = {...depto, autoridades: this.listaAutoridades, usuariosAsociados: this.listaUsuarios}
      console.log('depto: ', depto);
      this.crearSubdepartamento(this.idGrupo, depto);
    }
  }
  reinicairEstados(){ this.exitoEnvio = false; this.fallaEnvio = false; }
  /* FIN GRUPO FUNCIONES */
    /* FUNCIONES MODAL */
    ocultarModal(){ this.showModal = false; this.reinicairEstados(); }
    /* FIN FUNCIONES MODAL */
  //Metodos para la imagen formulario
  onFileSelected(event: any) {
    this.icono = event.target.files[0];
  }
  
  getSelectedImageURL() {
    if (this.icono) {
      return URL.createObjectURL(this.icono);
    }
    return 'about:blank';
  }

  redirecionar(url:string){
    window.location.href = url;
  }
  /* LLAMADAS API */
  obtenerUsuarios(){
    this.api.obtenerUsuarios(
      (data)=>{ this.usuarios = data;},
      ()=>{}
    );
  }
  obtenerRoles(){
    this.api.obtenerRoles(
      (data)=>{ this.roles = data; },
      ()=>{}
    );
  }
  obtenerNombreGrupo(id: number){
    this.api.obtenerNombreGrupo(
      id,
      (data) => { this.nombreGrupo = data.nombreDeDepartamento;},
      () => {}
    );
  }
  crearSubdepartamento(id: number, depto: any){
    this.api.crearSubDepartamento(
      id, 
      depto,
      (response)=>{ 
        this.showModal = true; this.exitoEnvio = true; this.formulario.reiniciarValores();
        if(this.icono){
          let id = response.id;
          const formData = new FormData();
          formData.append('imagen', this.icono);
          this.api.agregarIconoSubDepartamento(id, formData );
        }
      },
      ()=>{this.showModal = true; this.fallaEnvio = true;}
      );
  }
  /* FIN LLAMADAS API */
}

/*

    enviarFormulario(){
      this.formulario.autoridades = this.usuariosdepartamento;
      if(this.formulario.nombreDeDepartamento === "" || this.formulario.descripcion===""){
        alert("Se deben completar los campos: Nombre, Descripcion");
      }
      else{
        this.formulario.autoridades = this.usuariosdepartamento.map((autoridad)=>({usuarioId:autoridad.usuario.id, rolId: autoridad.rol.id}));
        const {urlIcono, nombreDeDepartamento, descripcion, autoridades} = this.formulario;
        let enviar = {urlIcono, nombreDeDepartamento, descripcion, autoridades};
        console.log(enviar);
        
        this.api.crearDepartamento(
          this.idGrupo,
          enviar,
          (response) => { 
            if(this.icono){
              let id = response.id;
            
              const formData = new FormData();
              formData.append('imagen', this.icono);
              this.api.agregarIcono(id, formData );  
            }
                       
            //this.redirecionar("/departamentos/ver-departamento/" + id); TODO agregar modal
          },
          (error) => { console.error('Error al crear el departamento', error); }
        );
      }
    */

      export interface Rol{ id:number; rol:string; }
      export interface Grupo{ id:number; nombre:string; }
      export interface Usuario { id: number; nombre: string; }
      export interface Autoridad {rolId:number; usuarioId:number;}
      export interface Formularios{
        //Zona departamentos
        urlIcono:string;
        grupo:Grupo;
        nombreDeDepartamento:string;
        descripcion:string;
        //Zona usuarios
        autoridades:Autoridad[];
      }