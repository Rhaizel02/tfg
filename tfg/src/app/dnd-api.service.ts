import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DndApiService {
  private apiUrl = 'https://www.dnd5eapi.co/api/';

  constructor(private http: HttpClient) { }

  obtenerApi(id : string){
    return this.http.get(`${this.apiUrl}${id}`);
  }

  obtenerHechizos() {
    return this.http.get(`${this.apiUrl}/spells`);
  }

  obtenerHechizoPorId(id: string) {
    return this.http.get(`${this.apiUrl}spells/${id}`);
  }

  obtenerHechizoPorNombre(nombre: string) {
    return this.http.get(`${this.apiUrl}spells/?name=${nombre}`);
  }

  obtenerDetallesSubindicePorId(hechizoId: string, subindiceId: string) {
    return this.http.get(`${this.apiUrl}spells/${hechizoId}/${subindiceId}`); 
  }

}