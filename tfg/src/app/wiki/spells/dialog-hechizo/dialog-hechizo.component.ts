import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-hechizo',
  templateUrl: './dialog-hechizo.component.html',
  styleUrls: ['./dialog-hechizo.component.css']
})
export class DialogHechizoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public spell: any) { }
}
