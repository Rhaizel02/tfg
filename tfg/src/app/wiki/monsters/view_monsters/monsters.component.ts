import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DndApiService } from '../../../services/dnd-api.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Consulta } from '../../../interfaces/consulta';
import { ParesFiltro } from 'src/app/interfaces/pares-filtro';
import { DialogmonsterComponent } from '../dialog_monster/dialogmonster/dialogmonster.component';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css'],
})
export class MonstersComponent {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  // Variable que almacenan los monstruos
  monstruos: Consulta = { count: 0, next: '', previous: '', results: [] };
  libros: Consulta = { count: 0, next: '', previous: '', results: [] };
  constructor(private api: DndApiService, private dialog: MatDialog) {}

  //Variables para el filtrado
  nombre: string = '';
  cr_seleccionado: string = '';
  categoria_seleccionada: string = '';
  libro_elegido: string = '';
  crs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  categorias: string[] = [];
  displayedColumns: string[] = ['name', 'cr', 'type', 'alignment', 'book'];

  // Variables para la paginación
  pageSize: number = 20;
  currentPage: number = 1;
  cargado = false;

  pares: ParesFiltro[] = [];
  filtros: string = '';
  query: string = '';

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.cargarTiposMonstruos();
    this.cargarLibros();
    this.cargarMonstruos();
  }

  cargarTiposMonstruos() {
    this.categorias = this.api.obtenerTiposMonstruos();
  }

  cargarLibros() {
    this.api.obtenerLibros().subscribe((consulta) => {
      this.libros = consulta;
    });
  }

  cargarMonstruos() {
    this.query =
      '?page=' + this.currentPage + '&limit=' + this.pageSize + this.filtros;
    this.api.obtenerMonstruos(this.query).subscribe((consulta) => {
      this.monstruos = consulta;
      this.dataSource = new MatTableDataSource<any>(this.monstruos.results);
      this.dataSource.data = this.dataSource.data;
      this.table.renderRows();
      this.cargado = true;
    });
  }

  Buscar() {
    this.filtros = '';
    this.currentPage = 1;
    
    this.pares = [
    { nombre: 'search', valor: this.nombre},
    { nombre: 'type', valor: this.categoria_seleccionada },
    { nombre: 'cr', valor: this.cr_seleccionado },
    { nombre: 'document__slug', valor: this.libro_elegido },];

    for (const par of this.pares) {
      if (par.valor != '') {
        console.log(par.nombre + ' ' + par.valor);
        this.filtros += '&' + par.nombre + '=' + par.valor;
      }
    }

    this.cargarMonstruos();
  }

  abrirDialog(entrada: any) {
    const dialogRef = this.dialog.open(DialogmonsterComponent, {
      width: '600px',
      data: entrada,
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.cargarMonstruos();
  }
}
