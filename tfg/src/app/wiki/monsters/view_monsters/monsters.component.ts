import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DndApiService } from '../../../services/dnd-api.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Consulta } from '../../../interfaces/consulta';

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
  constructor(
    private api: DndApiService,
    private dialog: MatDialog
  ) {}

  //Variables para el filtrado
  nombre: string = '';
  cr : number=-1;
  categoria : string = '';
  alineamiento : string = '';
  crs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  categorias: string[] = [];
  alineamientos = ['any alignment','any chaotic alignment','any evil alignment','any good alignment','any lawful alignment','any non-good alignment','any non-lawful alignment','chaotic evil','chaotic good','chaotic neutral','lawful evil','lawful good','lawful neutral','neutral','neutral evil','neutral good','unaligned'];
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


  ngOnInit(): void {
    ;
  }

  ngAfterViewInit() {
    this.cargarTiposMonstruos();
    this.cargarMonstruos();
  }

  cargarTiposMonstruos() {
    this.categorias = this.api.obtenerTiposMonstruos();
  }

  cargarMonstruos() {
    this.filtros = "?limit=" + this.pageSize + "&page="+this.currentPage;
    this.api.obtenerMonstruos(this.filtros).subscribe(consulta => {
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
      this.filtros += "&spell_level=" + this.cr;
    }
    if (this.alineamiento != "") {
      this.filtros += "&alignment=" + this.alineamiento;
    }
    this.cargarMonstruos();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = (event.pageIndex + 1);
    this.cargarMonstruos();
  }

}
