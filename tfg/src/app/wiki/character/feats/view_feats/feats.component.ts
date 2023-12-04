import { Component } from '@angular/core';
import { DndApiService } from 'src/app/services/dnd-api.service';
import { Consulta } from 'src/app/interfaces/consulta';
@Component({
  selector: 'app-feats',
  templateUrl: './feats.component.html',
  styleUrls: ['./feats.component.css']
})
export class FeatsComponent {
    feats: Consulta = { count: 0, next: '', previous: '', results: [] };
    constructor(private api : DndApiService) { }

    ngOnInit(): void {
        this.api.getFeats().subscribe((consulta) => {
            this.feats = consulta;
        });
    }
}
