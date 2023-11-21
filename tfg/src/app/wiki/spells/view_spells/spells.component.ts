import { Component, OnInit } from '@angular/core';
import { DndApiService } from '../../../services/dnd-api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DialogHechizoComponent } from '../dialog-hechizo/dialog-hechizo.component';
import { MatDialog } from '@angular/material/dialog';
import { Consulta } from '../../../interfaces/consulta';
import { ParesFiltro } from 'src/app/interfaces/pares-filtro';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css'],
})
export class SpellsComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  // Variables que almacenan los hechizos y sus detalles
  hechizos: Consulta = { count: 0, next: '', previous: '', results: [] };
  // Variables para el filtrado
  nombre: string = '';
  displayedColumns: string[] = ['nombre', 'level', 'range'];
  escuelas = ['illusion', 'abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'necromancy', 'transmutation'];
  escuela_seleccionada: string = "";
  niveles: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  nivel_seleccionado: string = "";
  clases: string[] = [];
  clase_seleccionada: string = "";

  // Variables para la paginación
  pageSize: number = 25;
  currentPage: number = 1;
  total: number = 0;
  cargado = false;

  pares: ParesFiltro[] = [];
  filtros: string = "";
  query: string = "";

  constructor(private api: DndApiService, private dialog: MatDialog) { }

  obtenerClases() {
    this.api.obtenerClasesMagicas().subscribe((data: any) => {
      for (const clase of data.results) {
        this.clases.push(clase.name);
      }
    });
  }

  abrirDialog(entrada: any) {
    const dialogRef = this.dialog.open(DialogHechizoComponent, {
      width: '700px',
      data: entrada, // Pasamos la entrada seleccionada al diálogo
    });
  }

  ngAfterViewInit(): void {
    this.obtenerClases();
    this.cargarHechizos();
  }

  ngOnInit(): void {
    ;
  }

  cargarHechizos() {
    this.query =
      '?page=' + this.currentPage + '&limit=' + this.pageSize + this.filtros;
    this.api.obtenerConjuros(this.query).subscribe((consulta) => {
      this.hechizos = consulta;
      this.dataSource = new MatTableDataSource<any>(this.hechizos.results);
      this.dataSource.data = this.dataSource.data;
      this.table.renderRows();
      this.cargado = true;
    });
  }

  Buscar(){
    this.filtros = "";
    this.currentPage = 1;

    this.pares = [
      { nombre: 'search', valor: this.nombre },
      { nombre: 'school', valor: this.escuela_seleccionada },
      { nombre: 'spell_level', valor: this.nivel_seleccionado },
      { nombre: 'spell_lists', valor: this.clase_seleccionada },
    ];

    for(const par of this.pares){
      if(par.valor != ""){
        console.log(par.nombre + " " + par.valor);
        this.filtros += "&" + par.nombre + "=" + par.valor;
      }
    }
    this.cargarHechizos();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = (event.pageIndex + 1);
    this.cargarHechizos();
  }

}
