import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DndApiService {
  private apiUrl = 'https://www.dnd5eapi.co/api/';

  constructor(private http: HttpClient) { }

  obtenerhechizosporclase() {

  }

  obtenerApi(id : string){
    return this.http.get(`${this.apiUrl}${id}`);
  }

  getSchools(){
    return this.http.get(`${this.apiUrl}magic-schools`);
  }

  obtenerHechizos() {
    return this.http.get(`${this.apiUrl}spells`);
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

  // obtener los hechizos de la escuela de abjuracion de nivel 2
  obtenerHechizosPorEscuelaYNivel(escuela: string, nivel: number) {
    return this.http.get(`${this.apiUrl}spells/?school=${escuela}&level=${nivel}`);
  }

  //obtener escuelas de magia
  obtenerEscuelasDeMagia() {
    return this.http.get(`${this.apiUrl}magic-schools`);
  }

  //obtener clases
  obtenerClases() {
    return this.http.get(`${this.apiUrl}classes`);
  }

  //obtener hechizos por clase y nivel
  obtenerHechizosPorClaseYNivel(clase: string, nivel: number) {
    return this.http.get(`${this.apiUrl}spells/?classes=${clase}&level=${nivel}`);
  }

  //obtener hechizos por clase
  obtenerHechizosPorClase(clase: string) {
    return this.http.get(`${this.apiUrl}spells/?classes=${clase}`);
  }
}