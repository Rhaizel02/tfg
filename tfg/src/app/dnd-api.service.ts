import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DndApiService {
  private apiUrl = 'https://api.open5e.com/v1/';

  constructor(private http: HttpClient) {}
  
  
  obtenerHechizos(s : string) {
    return this.http.get(`${this.apiUrl}spells${s}`);
  }
  
  obtenerClasesMagicas(){
    return this.http.get(`${this.apiUrl}spelllist/`);
  }

  obtenerClases(s : string){
    return this.http.get(`${this.apiUrl}classes${s}`);
  }

  obtenerRazas(s : string){
    return this.http.get(`${this.apiUrl}races${s}`);
  }

  obtenerMonstruos(s : string){
    return this.http.get(`${this.apiUrl}monsters${s}`);
  }
  
}
