import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenSkyService {

  constructor(private http: HttpClient) { }

  getPlanes() {
    return this.http.get<any>('http://localhost:3000/api/v1/planes/')
  }
}
