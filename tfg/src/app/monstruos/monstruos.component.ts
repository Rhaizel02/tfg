import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DndApiService } from '../dnd-api.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-monstruos',
  templateUrl: './monstruos.component.html',
  styleUrls: ['./monstruos.component.css'],
})
export class MonstruosComponent {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  // Variables que almacenan los hechizos y sus detalles
  monstruos: any[] = [];
  constructor(
    private hechizosApiService: DndApiService,
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
    'nombre',
    'cr',
    'tipo',
    'alineamiento',
    'origen',
  ];

  // Variables para la paginación
  pageSize: number = 10;
  currentPage: number = 1;
  total: number = 0;
  cargado = false;

  parametros: string = '';
  filtros: string = '';


  ngOnInit(): void {
    ;
  }

  ngAfterViewInit() {
    this.cargarTiposMonstruos();
    // this.cargarMonstruos();
  }

  cargarTiposMonstruos() {
    this.categorias = this.hechizosApiService.obtenerTiposMonstruos();
  }

  cargarMonstruos() {
    this.parametros = "?limit=" + this.pageSize + "&page=" + this.currentPage+this.filtros;
    this.hechizosApiService.obtenerHechizos("/" + this.parametros).subscribe((data: any) => {
      this.monstruos = data.results;
      if (this.total != data.count)
        this.total = data.count;
    });
    if(this.monstruos.length > 0)
      this.cargarDetallesMonstruos();
    else{
      this.dataSource = new MatTableDataSource<any>;
      this.dataSource.data = this.dataSource.data;
      this.table.renderRows();
    }
  }

  cargarDetallesMonstruos() {
    for (const hechizo of this.monstruos) {
      this.hechizosApiService
        .obtenerHechizos("/" + hechizo.slug)
        .subscribe((data: any) => {
          this.dataSource = new MatTableDataSource<any>(this.monstruos);
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
