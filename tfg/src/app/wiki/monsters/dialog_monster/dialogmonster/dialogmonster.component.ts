import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogmonster',
  templateUrl: './dialogmonster.component.html',
  styleUrls: ['./dialogmonster.component.css']
})
export class DialogmonsterComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
