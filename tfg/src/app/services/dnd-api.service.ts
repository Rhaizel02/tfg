import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../interfaces/consulta';
import { Observable, map } from 'rxjs';
import { RuleInterface } from '../interfaces/rule-interface';
import { BackgroundInterface } from '../interfaces/background';


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

  getRaceDetails(s: string) {
    return this.http.get(`${this.apiUrl}races/${s}`);
  }

  getRules() {
    let rules: RuleInterface[] = [];
    this.http
      .get(`${this.apiUrl}sections/?ordering=parent`)
      .subscribe((data: any) => {
        for (const rule of data.results) {
          rules.push({ name: rule.name, slug: rule.slug, parent: rule.parent });
        }
      });
    return rules;
  }

  getRuleDetails(s: string) {
    return this.http.get(`${this.apiUrl}sections/${s}`);
  }

  getBackgrounds(){
    let backgrounds: BackgroundInterface[] = [];
    this.http
      .get(`${this.apiUrl}backgrounds/`)
      .subscribe((data: any) => {
        for (const background of data.results) {
          backgrounds.push({name: background.name, slug: background.slug, desc: background.desc, document__title: background.document__title});
        }
      });
    return backgrounds;
  }

  getBackgroundDetails(s: string) {
    return this.http.get(`${this.apiUrl}backgrounds/${s}`);
  }
}
