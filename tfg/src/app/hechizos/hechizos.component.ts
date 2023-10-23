import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { DndApiService } from '../dnd-api.service';
import { Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
  nombre : string = '';
  busqueda: string = '';
  displayedColumns: string[] = ['nombre', 'level','range'];
  escuelas : string[] = [];
  escuela_seleccionada : string = "";
  niveles : number[] = [0,1,2,3,4,5,6,7,8,9];
  nivel_seleccionado : number = -1;
  clases : string[] = [];
  clase_seleccionada : string = "";
  
  pageSize : number = 10;
  page : number = 0;

  handlePage(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  
  obtenerEscuelas(){
    this.hechizosApiService.getSchools().subscribe((data: any) => {
      for (const escuela of data.results) {
        this.escuelas.push(escuela.name);
      }
    });
  }

  obtenerClases(){
    this.hechizosApiService.obtenerClases().subscribe((data: any) => {
      for (const clase of data.results) {
        this.clases.push(clase.name);
      }
    });
  }

  constructor(private hechizosApiService: DndApiService) {}

  BuscarApi(nombre : string, escuela : string, clase : string, nivel : number){ 
    this.cancelarHechizos();
    this.cargado = false;
    this.hechizosApiService.obtenerHechizosConFiltros(nombre, escuela, clase, nivel).subscribe(
      (data: any) => {
        this.hechizos = data.results;
        console.log(this.hechizos);
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
    this.obtenerClases();
    this.obtenerEscuelas();
    this.hechizosApiService.obtenerHechizos().subscribe((data: any) => {
      this.hechizos = data.results;
      this.cargarDetallesHechizos();
    });
    this.cargado = true;
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
    });
    this.cargado = true;
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
