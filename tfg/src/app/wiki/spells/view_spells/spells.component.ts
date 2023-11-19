import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DndApiService } from '../../../services/dnd-api.service';
import { Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DialogHechizoComponent } from '../dialog-hechizo/dialog-hechizo.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css'],
})
export class SpellsComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  // Variables que almacenan los hechizos y sus detalles
  hechizos: any[] = [];

  // Variables para el filtrado
  nombre: string = '';
  displayedColumns: string[] = ['nombre', 'level', 'range'];
  escuelas = ['illusion', 'abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'necromancy', 'transmutation'];
  escuela_seleccionada: string = "";
  niveles: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  nivel_seleccionado: number = -1;
  clases: string[] = [];
  clase_seleccionada: string = "";

  // Variables para la paginación
  pageSize: number = 10;
  currentPage: number = 1;
  total: number = 0;
  cargado = false;

  parametros: string = "";
  filtros: string = "";

  constructor(private hechizosApiService: DndApiService, private dialog: MatDialog) { }

  obtenerClases() {
    this.hechizosApiService.obtenerClasesMagicas().subscribe((data: any) => {
      for (const clase of data.results) {
        this.clases.push(clase.name);
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
    this.dataSource.data = [];
  }

  ngAfterViewInit(): void {
    this.obtenerClases();
    // esperar medio segundo
    setTimeout(() => {
      this.cargarHechizos();
    }, 1000);
    this.cargarHechizos();
  }

  ngOnInit(): void {
    ;
  }

  cargarHechizos() {
    this.parametros = "?limit=" + this.pageSize + "&page=" + this.currentPage+this.filtros;
    this.hechizosApiService.obtenerHechizos("/" + this.parametros).subscribe((data: any) => {
      this.hechizos = data.results;
      if (this.total != data.count)
        this.total = data.count;
    });
    if(this.hechizos.length > 0)
      this.cargarDetallesHechizos();
    else{
      this.dataSource = new MatTableDataSource<any>;
      this.dataSource.data = this.dataSource.data;
      this.table.renderRows();
    }
  }

  cargarDetallesHechizos() {
    for (const hechizo of this.hechizos) {
      this.hechizosApiService
        .obtenerHechizos("/" + hechizo.slug)
        .subscribe((data: any) => {
          this.dataSource = new MatTableDataSource<any>(this.hechizos);
        });
    }
    this.dataSource.data = this.dataSource.data;
    this.table.renderRows();
    this.cargado = true;
  }

  Buscar(){
    this.filtros = "";
    this.currentPage = 1;
    if (this.nombre != "") {
      this.filtros += "&search=" + this.nombre;
    }
    if (this.escuela_seleccionada != "") {
      this.filtros += "&school=" + this.escuela_seleccionada;
    }
    if (this.nivel_seleccionado != -1) {
      this.filtros += "&spell_level=" + this.nivel_seleccionado;
    }
    if (this.clase_seleccionada != "") {
      this.filtros += "&spell_lists=" + this.clase_seleccionada;
    }
    this.cargarHechizos();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = (event.pageIndex + 1);
    this.cargarHechizos();
  }

}
