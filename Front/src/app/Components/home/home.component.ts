import { Component } from '@angular/core';
import { OpenSkyService } from '../../Services/open-sky.service';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Plane } from '../../Models/Plane';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  //Declaramos nuestro mapa
  private map!: L.Map;
  //Creamos nuestro objeto avión
  plane: Plane = {altitud:0,longitud:0,origincountry:'',onground:false,latitud:0}
  //Declaramos nuestro icono svg
  svg = '<svg fill="#0084ff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#0084ff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" stroke-width="1.408"> <title>plane</title> <path d="M12.25 8.719l-0.469 0.469 4 0.344 2.406-2.406c0.375-0.375 1.063-0.938 2.063-1.563s1.656-0.813 1.906-0.563c0.688 0.688 0 2.031-2.063 4.063l-2.375 2.375 0.344 4 0.469-0.438c0.375-0.406 0.781-0.406 1.094-0.094 0.375 0.375 0.219 0.906-0.531 1.656l-0.75 0.781 0.375 2.688 0.531-0.563c0.344-0.375 0.719-0.375 1.063-0.063 0.375 0.375 0.313 0.844-0.188 1.344l-1.125 1.125c0.438 3 0.5 4.688 0.156 5.031-0.156 0.125-0.375 0.25-0.688 0.313-0.281 0.031-0.531 0-0.688-0.125-0.125-0.156-0.313-0.719-0.5-1.688-0.219-1-0.75-2.688-1.688-5.063-0.906-2.406-1.563-3.75-1.875-4.094-0.125-0.125-0.313-0.125-0.531 0-0.219 0.094-1 0.75-2.25 1.969-1.25 1.25-2.406 2.25-3.5 3.031-0.031 0.188 0.063 0.813 0.219 1.844s0.219 1.719 0.188 1.969c-0.063 0.25-0.313 0.594-0.719 1-0.219 0.219-0.375 0.344-0.531 0.375-0.406-0.406-1.031-1.719-1.875-3.875-2.344-1.031-3.625-1.688-3.875-1.938 0-0.125 0.125-0.313 0.344-0.531 0.406-0.406 0.75-0.656 1.031-0.688 0.25-0.063 0.906 0.031 1.938 0.219 1.031 0.156 1.656 0.219 1.875 0.219 0.75-1.125 2.156-2.781 4.344-4.969 0.625-0.688 0.813-1.125 0.594-1.344-0.313-0.344-1.688-0.969-4.063-1.875-2.406-0.906-4.063-1.5-5.063-1.688-1-0.219-1.563-0.375-1.688-0.531-0.156-0.125-0.188-0.375-0.125-0.688 0.031-0.313 0.156-0.531 0.313-0.688 0.313-0.313 2-0.281 5.031 0.156l1.094-1.125c0.5-0.469 0.969-0.531 1.344-0.156 0.344 0.313 0.313 0.688-0.031 1.031l-0.563 0.531 2.688 0.375 0.75-0.719c0.75-0.75 1.281-0.906 1.656-0.531 0.344 0.344 0.313 0.688-0.063 1.094z"></path> </g><g id="SVGRepo_iconCarrier"> <title>plane</title> <path d="M12.25 8.719l-0.469 0.469 4 0.344 2.406-2.406c0.375-0.375 1.063-0.938 2.063-1.563s1.656-0.813 1.906-0.563c0.688 0.688 0 2.031-2.063 4.063l-2.375 2.375 0.344 4 0.469-0.438c0.375-0.406 0.781-0.406 1.094-0.094 0.375 0.375 0.219 0.906-0.531 1.656l-0.75 0.781 0.375 2.688 0.531-0.563c0.344-0.375 0.719-0.375 1.063-0.063 0.375 0.375 0.313 0.844-0.188 1.344l-1.125 1.125c0.438 3 0.5 4.688 0.156 5.031-0.156 0.125-0.375 0.25-0.688 0.313-0.281 0.031-0.531 0-0.688-0.125-0.125-0.156-0.313-0.719-0.5-1.688-0.219-1-0.75-2.688-1.688-5.063-0.906-2.406-1.563-3.75-1.875-4.094-0.125-0.125-0.313-0.125-0.531 0-0.219 0.094-1 0.75-2.25 1.969-1.25 1.25-2.406 2.25-3.5 3.031-0.031 0.188 0.063 0.813 0.219 1.844s0.219 1.719 0.188 1.969c-0.063 0.25-0.313 0.594-0.719 1-0.219 0.219-0.375 0.344-0.531 0.375-0.406-0.406-1.031-1.719-1.875-3.875-2.344-1.031-3.625-1.688-3.875-1.938 0-0.125 0.125-0.313 0.344-0.531 0.406-0.406 0.75-0.656 1.031-0.688 0.25-0.063 0.906 0.031 1.938 0.219 1.031 0.156 1.656 0.219 1.875 0.219 0.75-1.125 2.156-2.781 4.344-4.969 0.625-0.688 0.813-1.125 0.594-1.344-0.313-0.344-1.688-0.969-4.063-1.875-2.406-0.906-4.063-1.5-5.063-1.688-1-0.219-1.563-0.375-1.688-0.531-0.156-0.125-0.188-0.375-0.125-0.688 0.031-0.313 0.156-0.531 0.313-0.688 0.313-0.313 2-0.281 5.031 0.156l1.094-1.125c0.5-0.469 0.969-0.531 1.344-0.156 0.344 0.313 0.313 0.688-0.031 1.031l-0.563 0.531 2.688 0.375 0.75-0.719c0.75-0.75 1.281-0.906 1.656-0.531 0.344 0.344 0.313 0.688-0.063 1.094z"></path> </g></svg>'
  //Creamos icono para el mapa
  mapIcon = L.divIcon({
    html: this.svg,
    iconSize:[32,32],
    className: 'mapicon'
  })
  //Variable para ver si el mapa se ha cargado ya
  isMapLoaded = false
  //Inicializamos nuestro marcador
  marker!: L.Marker
  //Declaramos nuestro intervalId
  private intervalId: any

  constructor(private service: OpenSkyService, private http: HttpClient) {  }
  
  //Actualizamos los datos y el mapa cada 10 segundos
  ngOnInit() {
    this.getPlanes();
    this.intervalId = setInterval(() => {
      this.getPlanes();
    }, 11000)
  }

  ngOnDestroy() {
    //Limpiamos el intervalo al destruir el componente
    clearInterval(this.intervalId);
  }


  private getPlanes() {
    this.service.getPlanes()
    .subscribe({
      next: (res) => {
          this.plane.latitud = res.states[0][6]
          this.plane.longitud = res.states[0][7]
          this.plane.altitud = res.states[0][13]
          this.plane.origincountry = res.states[0][2]
          this.plane.onground = res.states[0][8]
          console.log(this.plane)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  private loadMap() {
    //Cargamos nuestro mapa con nuestra latitud y longitud
    this.map = L.map('map').setView([this.plane.latitud,this.plane.longitud],4);

    //Creamos capa de mosaicos para el mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    //Ponemos marcador 
    this.marker = L.marker([this.plane.latitud,this.plane.longitud],{icon: this.mapIcon}).addTo(this.map)
    }

  //Método para actualizar la posición del avión cada 11 segundos, ya que la api permite cada 10 segundos  
  private refreshMap() {
    this.marker.setLatLng([this.plane.latitud,this.plane.longitud])
  }  
}


