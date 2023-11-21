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

  constructor(private apiService: DndApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.obtenerRazas().subscribe(data => {
      this.races = data;
    });
  }

  RaceDetail(slug: string) {
    this.router.navigate(['/races/', slug]);
  }
}
