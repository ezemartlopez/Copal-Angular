import { Component, OnInit } from '@angular/core';
import { ApiService } from '../ServiciosApi/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ver-departamento',
  templateUrl: './ver-departamento.component.html',
  styleUrls: ['./ver-departamento.component.css']
})
export class VerDepartamentoComponent implements OnInit {
  private urlApi: string = "http://localhost:8080"
  info: any | null;
  parametro: string = "";
  noExiste: boolean;
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.info = null;
    this.noExiste = false;
  }
  ngOnInit(): void {
      this.obtenerId();
  }
  traerInfo(id:number){
    this.api.getMicroDepartamento(
      id,
      (data) => { this.info= data; console.log('data: ',data); },// Maneja los datos exitosos
      (error) => { console.error(error); this.noExiste = true; this.info = null;}// Maneja el error (opcional)
    );
  }
  private obtenerId(){
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.parametro = id? id: "" ; // 'id' es el nombre del parámetro definido en la ruta
      console.log("Parametro: ", this.parametro);
    });
    this.traerInfo(parseInt(this.parametro));
  }
  getImagen(){
    return this.info.icono.urlPublica;
  }
}
