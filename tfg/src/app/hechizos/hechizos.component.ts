import { Component, OnInit } from '@angular/core';
import { DndApiService } from '../dnd-api.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hechizos',
  templateUrl: './hechizos.component.html',
  styleUrls: ['./hechizos.component.css'],
})
export class HechizosComponent implements OnInit {
  hechizos: any[] = [];
  detallesHechizos: any[] = [];
  cargado = false;
  busqueda: string = '';

  constructor(private hechizosApiService: DndApiService) {}

  BuscarApi() {
    this.cancelarHechizos();
    this.cargado = false;
    this.hechizosApiService.obtenerHechizoPorNombre(this.busqueda).subscribe(
      (data: any) => {
        this.hechizos = data.results;
        this.cargarDetallesHechizos();
        this.cargado = true;
      },
      (errorResponse) => {
        alert('oh no, there was an error when calling the dnd api');
        console.error(errorResponse);
      }
    );
  }

  cancelarHechizos() {
    this.hechizos = [];
    this.detallesHechizos = [];
  }

  ngOnInit(): void {
    this.hechizosApiService.obtenerHechizos().subscribe((data: any) => {
      this.hechizos = data.results;
      this.cargarDetallesHechizos();
      this.cargado = true;
    });
  }

  cargarDetallesHechizos() {
    for (const hechizo of this.hechizos) {
      this.hechizosApiService
        .obtenerHechizoPorId(hechizo.index)
        .subscribe((data: any) => {
          this.detallesHechizos.push(data);
        });
    }
  }
}
