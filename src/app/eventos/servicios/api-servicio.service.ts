import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServicioService {
  private base = 'https://acc-squad-m1s2-back-dev.dds.disilab.cpci.org.ar';
  private urlEventos = this.base + '/eventos';
  private urlBusqueda = this.base + '/eventos/search';
  private urlCrearEvento = this.urlEventos + '/crear-evento'
  private urlProvincias = this.base + '/provincias'
  private urlDepartamentos = this.base + '/subDepartamento?formato=basico'
  private urlEstados = this.base + '/eventos/estados';
  private urlUsuarios = this.base + '/usuarios?formato=basico';
  private urlSocios=this.base +'/socios?formato=basico';

  constructor(private http: HttpClient) { }

  /* funciones generales */

  getProvincias(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.urlProvincias).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setter([]);// Establece una lista vacía como respuesta
      }
    );
  }

  getLocalidades(idProvincia:number | string, setter: (data: any) => void, errorHandler: (error: any) => void): void {
    let url = this.urlProvincias + `/${idProvincia}/localidades`;
    this.http.get(url).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setter([]);// Establece una lista vacía como respuesta
      }
    );
  }
  getDepartamentos(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.urlDepartamentos).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setter([]);// Establece una lista vacía como respuesta
      }
    );
  }
  getEstados(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.urlEstados).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setter([]);// Establece una lista vacía como respuesta
      }
    );
  }
  getUsuarios(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.urlUsuarios).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setter([]);// Establece una lista vacía como respuesta
      }
    );
  }

  getPage(filtroAPlicado: boolean,parametros: string, setter: (data: any) => void, setterError: (data: any) => void, errorHandler: (error: any) => void): void {
    
    let url = filtroAPlicado? this.urlBusqueda: this.urlEventos; 
    url += parametros;
    console.log('llama a: ', url);
    
    this.http.get(url).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setterError([]);// Establece una lista vacía como respuesta
      }
    );
  }
  ///eventos/invitacion/{código}
  getEventoPorCodigo(codigo: string, setter: (data: any) => void, errorHandler: (error: any) => void): void {
    const url = this.urlEventos + `/invitacion/${codigo}`;
    this.http.get(url).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setter(null);// Establece una lista vacía como respuesta
      }
    );
  }

  /* ########################################################################################################################## */
  /* LLAMADAS PROPIAS DE CREAR EVENTOS */
  /* obtengo la info para el formulario crear evento */
  requisitosEventos(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.urlEventos).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setter([]);// Establece una lista vacía como respuesta
      }
    );
  }
  /* Get para obtener el evento por su id */
  getEvento(id : number, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const ruta = this.urlEventos + `/${id}`
    this.http.get(ruta).subscribe(
        response => {
          if (successCallback) { successCallback(response); }
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  } 

  /* POST para crear el evento */
  postEvento(data: any, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    this.http.post(this.urlEventos, data).subscribe(
        response => { 
          if (successCallback) { successCallback(response); }
          console.log(response);
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }
  /* Put para editar un evento por su id */
  putEvento(id : number, data: any, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const ruta = this.urlEventos + `/${id}`
    this.http.put(ruta, data).subscribe(
        response => {
          if (successCallback) { successCallback(response); }
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }

  /* Delete para borrar un evento por su id */
  deleteEvento(id : number, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const ruta = this.urlEventos + `/${id}`
    this.http.delete(ruta).subscribe(
        response => {
          if (successCallback) { successCallback(response); }
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }
  
  getEventosCopal(setter: (data: any) => void, setterError: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.urlEventos).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setterError([]);// Establece una lista vacía como respuesta
      }
    );
  }
  getEventosCopalFilter(filter: string,setter: (data: any) => void, setterError: (data: any) => void, errorHandler: (error: any) => void): void {
    //eventos?tipoEvento=HIBRIDO&departamentoId=1&estadoId=2&page=1
    const url = this.urlBusqueda + `?${filter}`;
    this.http.get(url).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setterError([]);// Establece una lista vacía como respuesta
      }
    );
  }

  /* ########################################################################################################################## */
  //LLAMADA PARA REGISTRAR UN USUARIO A UN EVENTO
  //eventos/{idEvento}/participantes
  postRegistro(data: any,idEvento:number, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const url = this.urlEventos + `/${idEvento}/participantes`;
    this.http.post(url, data).subscribe(
        response => { 
          if (successCallback) { successCallback(response); }
          
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }

  subirImagen(idEvento:number, file: File ): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', file);
    const url = this.urlEventos + `/${idEvento}/imagen`;
    return this.http.post(url, formData);
  }

  //Solicitud para obtener los socios 
  getSocios(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.urlSocios).subscribe(
      (data) => { setter(data); },// Llama a la función "setter" para guardar los datos
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) { errorHandler(error); }
        setter([]);// Establece una lista vacía como respuesta
      }
    );
  }
  putEventoEstado(id_evento:any, id_estado:any, successCallback: ()=> void, errorCallback: ()=> void){
    let url = this.urlEventos + `/${id_evento}/${id_estado}`;
    this.http.put(url,{}).subscribe(
      response => {
        console.log('Actualización exitosa:', response);
        successCallback();
      },
      error => {
        console.error('Error al actualizar:', error);
        errorCallback();
      }
    );
  }
}
