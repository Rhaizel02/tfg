import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-dices',
  templateUrl: './dices.component.html',
  styleUrls: ['./dices.component.css'],
})
export class DicesComponent {
  displayedColumns: string[] = ['no', 'dice', 'modifier', 'advantage'];
  entrada: any[] = [{ no: 1, dice: 4, modifier: 0, advantage: 0 }];
  dados = [
    { valor: 4, etiqueta: 'D4' },
    { valor: 6, etiqueta: 'D6' },
    { valor: 8, etiqueta: 'D8' },
    { valor: 10, etiqueta: 'D10' },
    { valor: 12, etiqueta: 'D12' },
    { valor: 20, etiqueta: 'D20' },
    { valor: 100, etiqueta: 'D100' },
  ];
  advantages = [
    { valor: 0, etiqueta: 'Normal' },
    { valor: 1, etiqueta: 'Advantage' },
    { valor: -1, etiqueta: 'Disadvantage' },
  ];
  miDado = new FormControl('4');

  @ViewChild(MatTable) table!: MatTable<any[]>;

  log : string = 'Roll dices will appear here: \n \n';
  script: string = '';
  miControl: any;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.table.dataSource = this.entrada;
    this.table.renderRows();
  }

  addRow() {
    this.entrada.push({
      no: 1,
      dice: 4,
      modifier: 0,
      advantage: 0,
    });
    this.table.renderRows();
  }

  removeRow() {
    this.entrada.pop();
    this.table.renderRows();
  }

  reset(){
    this.entrada = [{ no: 1, dice: 4, modifier: 0, advantage: 0 }];
    this.table.renderRows();
    this.log = 'Roll dices will appear here: \n \n';
  }

  roll() {
    this.script = '';

    for (let entry of this.entrada) {
      let total = 0;
      let rolls = [];
      let rollInfo = '';
  
      for (let j = 0; j < entry.no; j++) {
        let roll = Math.floor(Math.random() * entry.dice) + 1; // Tira un dado
        let roll2 = 0;
  
        // Aplica ventaja o desventaja si es necesario
        if (entry.advantage === 1) {
          roll2 = Math.floor(Math.random() * entry.dice) + 1;
          rollInfo = ` Advantage (Rolls: ${roll}, ${roll2})`;
          roll = Math.max(roll, roll2);
        } else if (entry.advantage === -1) {
          roll2 = Math.floor(Math.random() * entry.dice) + 1;
          rollInfo = ` Disadvantage (Rolls: ${roll}, ${roll2})`;
          roll = Math.min(roll, roll2);
        }
  
        rolls.push(`${roll}${rollInfo}`);
        total += roll;
      }
  
      total += entry.modifier; // Aplica el modificador
  
      // Agrega el resultado de este conjunto de lanzamientos al script
      this.script += `-> Roll ${entry.no}d${entry.dice} + ${entry.modifier}: [${rolls.join(", ")}] = ${total}\n`;
    }

    this.log += this.script;

  }
}
