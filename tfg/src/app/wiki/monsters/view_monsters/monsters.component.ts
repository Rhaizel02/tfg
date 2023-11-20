import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DndApiService } from '../../../services/dnd-api.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Consulta } from '../../../interfaces/consulta';
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
  libros: Consulta = { count: 0, next: '', previous: '', results: []}
  constructor(
    private api: DndApiService,
    private dialog: MatDialog
  ) {}

  //Variables para el filtrado
  nombre: string = '';
  cr : number=-1;
  categoria : string = '';
  libro_elegido : string = '';
  crs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  categorias: string[] = [];
  displayedColumns: string[] = [
    'name',
    'cr',
    'type',
    'alignment',
    'book',
  ];

  // Variables para la paginación
  pageSize: number = 20;
  currentPage: number = 1;
  cargado = false;

  filtros: string = '';
  query: string = '';


  ngOnInit(): void {
    ;
  }

  ngAfterViewInit() {
    this.cargarTiposMonstruos();
    this.cargarLibros();
    this.cargarMonstruos();
  }

  cargarTiposMonstruos() {
    this.categorias = this.api.obtenerTiposMonstruos();
  }

  cargarLibros(){
    this.api.obtenerLibros().subscribe(consulta => {
      this.libros = consulta;
      console.log(this.libros);
    });
  }

  cargarMonstruos() {
    this.query = "?page=" + this.currentPage + "&limit=" + this.pageSize + this.filtros;
    this.api.obtenerMonstruos(this.query).subscribe(consulta => {
      this.monstruos = consulta;
      this.dataSource = new MatTableDataSource<any>(this.monstruos.results);
      this.dataSource.data = this.dataSource.data;
      this.table.renderRows();
      this.cargado = true;
    });
  }
  

  Buscar(){
    this.filtros = "";
    this.currentPage = 1;
    if (this.nombre != "") {
      this.filtros += "&search=" + this.nombre;
    }
    if (this.categoria != "") {
      this.filtros += "&type=" + this.categoria;
    }
    if (this.cr != -1) {
      this.filtros += "&cr=" + this.cr;
    }
    if (this.libro_elegido != "") {
      this.filtros += "&document__slug=" + this.libro_elegido;
    }
    this.cargarMonstruos();
  }

  ordenar(s : string){
    this.filtros += "&ordering=" + s;
    this.cargarMonstruos();
  }

  abrirDialog(entrada: any) {
    const dialogRef = this.dialog.open(DialogmonsterComponent, {
      width: '400px',
      data: entrada,
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = (event.pageIndex + 1);
    this.cargarMonstruos();
  }

}
