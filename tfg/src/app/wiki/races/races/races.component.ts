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
  races: any[] = [];
  libros: any[] = [];
  libros_slug: string[] = []; 
  libros_title: string[] = [];

  constructor(private api: DndApiService, private router: Router) {}

  ngOnInit() {

    this.libros = this.api.obtenerLibrosporRazas();

    this.libros.forEach(element => {
      this.libros_slug.push(element.slug);
      this.libros_title.push(element.title); 
      console.log(element.slug);
    });

    for(let x in this.libros_slug){
      this.api.obtenerRazasporLibro(x).subscribe((data: any) => {
        this.races.push(data.results);
      });
    }

  }

  RaceDetail(slug: string) {
    this.router.navigate(['/races/', slug]);
  }

}
