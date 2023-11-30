import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DndApiService } from 'src/app/services/dnd-api.service';

@Component({
  selector: 'app-backgrounds',
  templateUrl: './backgrounds.component.html',
  styleUrls: ['./backgrounds.component.css']
})
export class BackgroundsComponent {
  backgrounds: any[] = [];
  constructor(private api: DndApiService, private router: Router) {}

  ngAfterViewInit() {
    this.backgrounds = this.api.getBackgrounds();
  }

  BackgroundDetail(slug: string) {
    this.router.navigate(['/background/', slug]);
  }
}
