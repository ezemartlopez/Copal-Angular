import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Formulario, Campo, esRequerido, usuarioValido, rolValido} from './modelo'
import { ApiServiceService} from './api-service.service'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-editar-formulario-grupo-departamento',
    templateUrl: './editar-formulario-grupo-departamento.component.html',
    styleUrls: ['./editar-formulario-grupo-departamento.component.css']
})
export class EditarFormularioGrupoDepartamentoComponent  implements OnInit{
  formulario: Formulario;
  autoridades: Formulario;
  listaAutoridades: any[];
  usuarios: any[];
  roles: any[];
  showModal: boolean;
  exitoEnvio: boolean;
  fallaEnvio: boolean;
  id: string;
  constructor(private api: ApiServiceService, private route: ActivatedRoute) {
    this.formulario = new Formulario({
      nombreDeDepartamento:new Campo("nombreDeDepartamento", '', [esRequerido]),
      descripcion:new Campo("descripcion", '', [esRequerido]),
    });
    this.autoridades = new Formulario({
      usuarioId:new Campo("usuarioId", '0', [esRequerido, usuarioValido]),
      rolId:new Campo("rolId", '1', [esRequerido, rolValido]),
    });
    this.usuarios = [];
    this.roles = [];
    this.listaAutoridades = [];
    this.showModal = false;
    this.exitoEnvio = false;
    this.fallaEnvio = false;
    this.id = '';
  }
/* AUTORIDADES FUNCIONES */
  agregarAutoridad(){
    if (this.autoridades.esValido()) {
      console.log('Agregando usuario');
      const idGrupo = parseInt(this.id);
      const idUsuario = parseInt(this.autoridades.campos['usuarioId'].valorInicial);
      const idRol = parseInt(this.autoridades.campos['rolId'].valorInicial);
      this.api.agregarAutoridadAGrupo(idGrupo, idUsuario, idRol,
        (data) => {
          this.listaAutoridades.push({usuarioId: idUsuario, rolId: idRol})
          this.reiniciarFormularioAutoridades();
        },
        () => {}
        );
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
  eliminarAutoridadLista(usuarioId: number, rolId: number, idAutoridad: number){
    this.api.eliminarAutoridadGrupo(idAutoridad,
      () => {this.eliminarUsuarioPorIdYRol(usuarioId, rolId);},
      () => {}
      );
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
      let formulario = this.formulario.obtenerObjeto();
      formulario = {...formulario, autoridades: []}
      console.log('Esto se va a enviar: ', formulario);
      const id = parseInt(this.id);
      this.actaulizarDepartamento(id,formulario);
    }
  }
  reinicairEstados(){ this.exitoEnvio = false; this.fallaEnvio = false; }
  /* FIN GRUPO FUNCIONES */
  /* FUNCIONES MODAL */
  ocultarModal(){ this.showModal = false; this.reinicairEstados(); }
  /* FIN FUNCIONES MODAL */
  ngOnInit(): void {
      this.obtenerId();
      this.obtenerUsuarios();
      this.obtenerRoles();
  }
  private obtenerId(){
    this.route.paramMap.subscribe(params => {
      let parametro = params.get('id');
      this.id = parametro? parametro: "" ; // 'id' es el nombre del parámetro definido en la ruta
      console.log("Id Depto: ", this.id);
      this.obtenerInformacionDepartamento();
    });
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
  obtenerInformacionDepartamento(){
    this.api.obtenerDepartamento(
      this.id,
      (data)=>{
        this.formulario.campos['nombreDeDepartamento'].valorInicial = data.nombreDeDepartamento;
        this.formulario.campos['descripcion'].valorInicial = data.descripcion;
        data.autoridades.forEach((autoridad: any) => {
          this.listaAutoridades.push({usuarioId: autoridad.usuario.id, rolId: autoridad.rol.id, id: autoridad.id});
        });
      },
      ()=>{}
    );
  }
  crearGrupoDepartamento(formulario: any){
    this.api.crearDepartamento(
      formulario,
      (response)=>{ this.showModal = true; this.exitoEnvio = true; this.formulario.reiniciarValores(); },
      ()=>{ this.showModal = true; this.fallaEnvio = true; }
    );
  }
  actaulizarDepartamento(id: number, formulario: any){
    this.api.actualizarDepartamento(
      id,
      formulario,
      (data)=>{this.showModal = true; this.exitoEnvio = true;},
      ()=>{this.showModal = true; this.fallaEnvio = true;}
    )
  }
  agregarAutoridadGrupo(idGrupo: number, idUsuario: number, idRol: number){
    this.api.agregarAutoridadAGrupo(idGrupo, idUsuario, idRol,
      (data) => {},
      () => {}
      );
  }
  eliminarAutoridadGrupo(idAutoridad: number){
    this.api.eliminarAutoridadGrupo(idAutoridad,
      () => {},
      () => {}
      );
  }
  /* FIN LLAMADAS API */
}