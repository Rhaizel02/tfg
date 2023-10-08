import { Component, OnInit } from '@angular/core';
import { DndApiService } from '../dnd-api.service';

@Component({
  selector: 'app-hechizos',
  templateUrl: './hechizos.component.html',
  styleUrls: ['./hechizos.component.css']
})
export class HechizosComponent implements OnInit {
  hechizos: any[] = [];
  detallesHechizos: any[] = [];

  constructor(private hechizosApiService: DndApiService) { }

  ngOnInit(): void {
    this.hechizosApiService.obtenerHechizos().subscribe((data: any) => {
      this.hechizos = data.results;
      this.cargarDetallesHechizos();
    });
  }

  cargarDetallesHechizos() {
    for (const hechizo of this.hechizos) {
      this.hechizosApiService.obtenerHechizoPorId(hechizo.index).subscribe((data: any) => {
        this.detallesHechizos.push(data);
      });
    }
  }

  
}
