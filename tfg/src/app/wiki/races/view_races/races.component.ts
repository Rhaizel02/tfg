import { Component, OnInit } from '@angular/core';
import { DndApiService } from 'src/app/services/dnd_api/dnd-api.service';
import { Router } from '@angular/router';
import { Libro, RaceInfo } from 'src/app/interfaces/libro';


@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  libros: Libro[] = [];
  titulos: string[] = [];

  constructor(private api: DndApiService, private router: Router) {}

  ngOnInit() {
    this.api.obtenerRazas().subscribe((datos: any) => {
      // Obtenemos los títulos de los libros
      this.titulos = datos.results.map((x: any) => x.document__title);
      // Eliminamos los títulos repetidos
      this.titulos = this.titulos.filter((v, i, a) => a.indexOf(v) === i);
      // Creamos un array de objetos con los títulos y un array vacío de razas
      for(const x of this.titulos){
        this.libros.push({title: x, races:[]});
      }
      // Añadimos las razas a cada libro
      for(const x of datos.results){
        for(const i of this.libros){
          if(x.document__title == i.title){
            i.races.push({name: x.name, desc: x.desc, slug: x.slug});
          }
        }
      }
    });
  }

  RaceDetail(slug: string) {
    this.router.navigate(['/races/', slug]);
  }

}
