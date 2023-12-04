import { Component, OnInit } from "@angular/core";
import { environmentLocal } from "src/environments/environment";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  private urlFrontProd:string = 'https://acc-squad-m1s2-front-dev.dds.disilab.cpci.org.ar';
  private urlFrontLocal: string = 'http://localhost:4200';
  constructor() {
    this.ocultarNav();
  }

  ngOnInit() {}
  public ocultarNav(){
    const currentURL = window.location.href;//verificar 
    // Oculta las rutas de invitacion de eventos
    const urlLocalEventos = this.urlFrontLocal + '/eventos/invitacion';
    const urlProdEventos = this.urlFrontProd + '/eventos/invitacion';
    //Oculta las rutas de reservacion de espacios colaborativos
    const urlLocalEspacios = this.urlFrontLocal + '/espacios-colaborativos/reservacion-espacio';
    const urlProdEspacios = this.urlFrontProd + '/espacios-colaborativos/reservacion-espacio';
    //Oculta las rutas de estado de reservacion
    const urlLocalReservacion = this.urlFrontLocal + '/espacios-colaborativos/reservacion';
    const urlProdEReservacion = this.urlFrontProd + '/espacios-colaborativos/reservacion';

    //agregar aqui las urls que quiere verificar
    let lista = [urlLocalEventos, urlProdEventos, urlLocalEspacios, urlProdEspacios, urlLocalReservacion, urlProdEReservacion]
    if (lista.includes(currentURL) || (currentURL.startsWith(urlLocalEventos) || currentURL.startsWith(urlProdEventos))) {
      const navElement = document.getElementById('nav');
      const mainElement = document.getElementById('main');
      if (navElement) {
          navElement.style.display = 'none'; // Oculta el elemento con el ID 'nav'
      }
      if (mainElement) {
        mainElement.style.marginTop = '0'; // Oculta el elemento con el ID 'nav'
      }
    }
  }
}
