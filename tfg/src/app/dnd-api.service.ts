import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DndApiService {
  private apiUrl = 'https://www.dnd5eapi.co/api/';

  constructor(private http: HttpClient) {}


  obtenerApi(id: string) {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  getSchools() {
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

  // obtener los hechizos de la escuela de abjuracion de nivel 2
  obtenerHechizosPorEscuelaYNivel(escuela: string, nivel: number) {
    return this.http.get(
      `${this.apiUrl}spells/?school=${escuela}&level=${nivel}`
    );
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
    return this.http.get(
      `${this.apiUrl}spells/?classes=${clase}&level=${nivel}`
    );
  }

  //obtener hechizos por clase
  obtenerHechizosPorClase(clase: string) {
    return this.http.get(`${this.apiUrl}classes/${clase}/spells`);
  }

  //obtener hechizos con filtros
  obtenerHechizosConFiltros(
    nombre: string,
    clase: string,
    escuela: string,
    nivel: number
  ) {
    let parametros = '';
    
    if(clase!=''){
      this.obtenerHechizosPorClase(clase).subscribe((data: any) => {
        for (const hechizo of data.results) {
          parametros += `name=${hechizo.name}&`;
        }
      });
    }

    if(nombre != ''){
      parametros += `name=${nombre}&`;
    }
    if(nivel != -1){
      parametros += `level=${nivel}&`;
    }
    if(escuela != ''){
      parametros += `school=${escuela}&`;
    }
    return this.http.get(`${this.apiUrl}spells/?${parametros}`);
  }

  
  obtenerHechizosPorClaseYEscuela(clase: string, escuela: string) {
      let data1 = this.http.get('{$this.apiUrl}classes/{$clase}}');
      let data2 = this.http.get('{$this.apiUrl}spells/?school=${escuela}');
      // hacer la conjuncion de data1 y data2

      

  }

}

