import { Component } from '@angular/core';
import { DndApiService } from 'src/app/services/dnd-api.service';
import { Router } from '@angular/router';
import { Libro } from 'src/app/interfaces/libro';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent {
  races: any[] = [];
  libros: Libro[] = [];

  constructor(private api: DndApiService, private router: Router) {}

  ngOnInit() {

    this.libros = this.api.obtenerLibrosporRazas();
  console.log(this.libros);
    for(let x in this.libros){
      console.log(x);
    }

  }

  RaceDetail(slug: string) {
    this.router.navigate(['/races/', slug]);
  }

}
