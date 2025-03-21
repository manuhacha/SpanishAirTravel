import { Component } from '@angular/core';
import { OpenSkyService } from '../../Services/open-sky.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  data:string = '';

  constructor(private service: OpenSkyService, private http: HttpClient) {  }

  ngOnInit() {
    this.getPlanes()
  }

  getPlanes() {
    this.service.getPlanes()
    .subscribe({
      next: (res) => {
        console.log(res)
        this.data = res.states
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}


