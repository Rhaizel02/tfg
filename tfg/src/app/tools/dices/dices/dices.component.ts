import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-dices',
  templateUrl: './dices.component.html',
  styleUrls: ['./dices.component.css']
})
export class DicesComponent {
  displayedColumns: string[] = ['no', 'dice', 'modifier', 'advantage'];
  entrada: any[] = [];

  @ViewChild(MatTable) table!: MatTable<any[]>;

  // script
  script: string = "";

  ngAfterViewInit() {
    this.entrada.push({ no: 0, dice: 1, modifier: 0, advantage: 0 });
    this.table.renderRows();
  }

  addRow(){
    this.entrada.push({ no: this.entrada.length, dice: 1, modifier: 0, advantage: 0 });
    this.table.renderRows();
  }

  removeRow(){
    this.entrada.pop();
    this.table.renderRows();
  }
}
