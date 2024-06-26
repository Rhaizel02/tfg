import { Component } from '@angular/core';
import { DndApiService } from 'src/app/services/dnd_api/dnd-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  classes: any[] = [];
  constructor(private api: DndApiService, private router: Router) {}

  ngAfterViewInit() {
    this.classes = this.api.getClasses();
  }

  clean(text: string) {
    return text.replace(/[^a-zA-Z ]/g, '');
  }

  ClassDetail(classSlug: string) {
    this.router.navigate(['/classes', classSlug]);
  }

}

