import {Component, OnInit} from "@angular/core";
import {SocioService} from "../SocioService/socioService.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-ver-socio",
  templateUrl: "./ver-socio.component.html",
  styleUrls: ["./ver-socio.component.css"],
})
export class VerSocioComponent implements OnInit{
  formData: any;
  parametro: string;
  loading : boolean;

  constructor(private route: ActivatedRoute, private socioService: SocioService) {
    this.formData =  null;
    this.loading = true;
    this.parametro = '';
  }

  ngOnInit() {
    console.log("Datos:",this.formData);
    // this.socioService.notificarVistaSocio.subscribe((data: any) => {
    //   this.formData = data;
    // })
    this.obtenerId();
  }

  public obtenerId(){
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.parametro = id? id: "" ; // 'id' es el nombre del parámetro definido en la ruta
      console.log("Parametro: ", this.parametro);
    });
    
    this.getSocio();
  }

  getSocio(){
    this.socioService.getUserById(this.parametro).subscribe((item: any) => {
      console.log(this.formData) ;
      console.log(item);
      //this.socioService.patchearFormulario(this.formData, item);
      this.formData = item
      this.loading = false
    });
  }

}
