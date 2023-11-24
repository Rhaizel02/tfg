import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../interfaces/consulta';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DndApiService {
  private apiUrl = 'https://api.open5e.com/v1/';

  constructor(private http: HttpClient) {}

  obtenerClasesMagicas() {
    return this.http.get(`${this.apiUrl}spelllist/`);
  }

  obtenerClases(s: string) {
    return this.http.get(`${this.apiUrl}classes${s}`);
  }

  obtenerRazas() {
    return this.http.get(`${this.apiUrl}races/`).pipe(
      map((data: any) => {
        let consulta: Consulta = {
          count: data.count,
          next: data.next,
          previous: data.previous,
          results: data.results,
        };
        return consulta;
      })
    );
  }


  obtenerConjuros(s: string) {
    return this.http.get(`${this.apiUrl}spells${s}`).pipe(
      map((data: any) => {
        let consulta: Consulta = {
          count: data.count,
          next: data.next,
          previous: data.previous,
          results: data.results,
        };
        return consulta;
      })
    );
  }

  obtenerMonstruos(s: string): Observable<Consulta> {
    return this.http.get(`${this.apiUrl}monsters/${s}`).pipe(
      map((data: any) => {
        let consulta: Consulta = {
          count: data.count,
          next: data.next,
          previous: data.previous,
          results: data.results,
        };
        return consulta;
      })
    );
  }

  obtenerTiposMonstruos() {
    let tipos: string[] = [];
    this.http
      .get(`${this.apiUrl}monsters/?fields=type&limit=10000`)
      .subscribe((data: any) => {
        for (const monstruo of data.results) {
          if (!tipos.includes(monstruo.type)) tipos.push(monstruo.type);
        }
      });
    return tipos;
  }

  obtenerLibros(): Observable<Consulta> {
    return this.http.get(`${this.apiUrl}documents/?fields=title,slug`).pipe(
      map((data: any) => {
        let consulta: any = {
          results: data.results,
        };
        return consulta;
      })
    );
  }

  getRaceDetails(s: string){
    return this.http.get(`${this.apiUrl}races/${s}`);
  }
}
