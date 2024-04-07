import { Component } from '@angular/core';
import * as marked from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DndApiService } from 'src/app/services/dnd-api.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {
  class: any;
  classSlug: any = '';
  panelOpenState : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: DndApiService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.classSlug = this.route.snapshot.paramMap.get('classSlug');
  }

  ngAfterViewInit(): void {
    if (this.classSlug) {
      this.api.getClassDetails(this.classSlug).subscribe((data) => {
        this.class = data;
      });
    }
  }

  getHtml(s: string) {
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(s));
  }


}
