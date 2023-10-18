import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { DndApiService } from '../dnd-api.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-hechizos',
  templateUrl: './hechizos.component.html',
  styleUrls: ['./hechizos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HechizosComponent implements OnInit {
  hechizos: any[] = [];
  detallesHechizos: any[] = [];
  cargado = false;
  busqueda: string = '';
  displayedColumns: string[] = ['nombre', 'level','range'];
  escuela : string = "";


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
    // this.cargarHechizos();
  }
 /*
  refresh() {
    this.cd.detectChanges();
  } 
  */

  cargarHechizos(){
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

  sortData(sort: Sort) {
    const data = this.detallesHechizos.slice();
    if (!sort.active || sort.direction === '') {
      this.detallesHechizos = data;
      return;
    }

    this.detallesHechizos = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'level':
          return compare(a.level, b.level, isAsc);
        case 'range':
          return compare(a.range, b.range, isAsc);

        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
