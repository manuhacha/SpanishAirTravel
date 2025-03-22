import { Component } from '@angular/core';
import { OpenSkyService } from '../../Services/open-sky.service';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   //Declaramos nuestro mapa
   private map!: L.Map;
   //Declaramos latitud y longitud
   private latitud:number = 0;
   private longitud:number = 0;

  constructor(private service: OpenSkyService, private http: HttpClient) {  }
  
  //Actualizamos los datos y el mapa cada 10 segundos
  ngOnInit() {
    this.getPlanes();
    console.log(this.latitud)
    this.loadMap();
  }


  getPlanes() {
    this.service.getPlanes()
    .subscribe({
      next: (res) => {
        console.log(res.states[0])
        this.latitud = res.states[0][6]
        this.longitud = res.states[0][7]
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  private loadMap() {

      //Cargamos nuestro mapa con nuestra latitud y longitud
    this.map = L.map('map').setView([this.latitud,this.longitud],13);

    //Creamos capa de mosaicos para el mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    //Ponemos marcador para mostrar más información
    L.marker([this.latitud,this.longitud]).addTo(this.map)
    .openPopup();

    }

}


