import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { DndApiService } from '../dnd-api.service';
import { Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DialogHechizoComponent } from '../dialog-hechizo/dialog-hechizo.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';

@Component({
  selector: 'app-hechizos',
  templateUrl: './hechizos.component.html',
  styleUrls: ['./hechizos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HechizosComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  // Variables que almacenan los hechizos y sus detalles
  hechizos: any[] = [];

  // Variables para el filtrado
  nombre : string = '';
  busqueda: string = '';
  displayedColumns: string[] = ['nombre', 'level','range'];
  escuelas : string[] = [];
  escuela_seleccionada : string = "";
  niveles : number[] = [0,1,2,3,4,5,6,7,8,9];
  nivel_seleccionado : number = -1;
  clases : string[] = [];
  clase_seleccionada : string = "";

  // Variables para la paginación
  pageSize : number = 10;
  currentPage : number = 1;
  total : number = this.hechizos.length;
  cargado = false;

  parametros : string = "";
  filtros : string = "";

  constructor(private hechizosApiService: DndApiService, private dialog : MatDialog) {}

  obtenerClases(){
    this.hechizosApiService.obtenerClasesMagicas().subscribe((data: any) => {
      for (const clase of data.results) {
        this.clases.push(clase.name.charAt(0).toUpperCase() + clase.name.slice(1));
      }
    });
  }
  
  abrirDialog(entrada: any) {
    const dialogRef = this.dialog.open(DialogHechizoComponent, {
      width: '400px',
      data: entrada, // Pasamos la entrada seleccionada al diálogo
    });
  }

  cancelarHechizos() {
    this.hechizos = [];
    this.dataSource = new MatTableDataSource<any>();
  }

  ngAfterViewInit(): void {
    this.obtenerClases();
    this.cargarHechizos();
  }

  ngOnInit(): void {
    ;
  }

  cargarHechizos(){
    this.parametros = "?limit="+this.pageSize+"&page="+this.currentPage;
    this.hechizosApiService.obtenerHechizos("/"+this.parametros).subscribe((data: any) => {
      this.hechizos = data.results;
      if (this.total != data.count)
        this.total = data.count;
    });
    this.cargarDetallesHechizos();
    this.cargado = true;
  }

  cargarDetallesHechizos() {
  console.log("Cargando detalles");
    for (const hechizo of this.hechizos) {
      this.hechizosApiService
        .obtenerHechizos("/"+hechizo.slug)
        .subscribe((data: any) => {
          this.dataSource = new MatTableDataSource<any>(this.hechizos);
        });
    }
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = (event.pageIndex+1);
    this.cargarHechizos();
  }

}
