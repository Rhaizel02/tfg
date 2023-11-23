import { Component } from '@angular/core';
import { DndApiService } from 'src/app/services/dnd-api.service';
import { Router } from '@angular/router';
import { Consulta } from 'src/app/interfaces/consulta';


@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent {
  races: Consulta = { count: 0, next: '', previous: '', results: [] };
  libros: string[] = [];

  constructor(private api: DndApiService, private router: Router) {}

  ngOnInit() {
    this.api.obtenerRazas().subscribe(data => {
      this.races = data;
    });

    this.libros = this.api.obtenerLibrosporRazas();
    console.log(this.libros);
  }

  RaceDetail(slug: string) {
    this.router.navigate(['/races/', slug]);
  }

}
