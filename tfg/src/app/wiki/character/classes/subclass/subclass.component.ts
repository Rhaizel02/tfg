import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DndApiService } from 'src/app/services/dnd-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';
@Component({
  selector: 'app-subclass',
  standalone: true,
  imports: [],
  templateUrl: './subclass.component.html',
  styleUrl: './subclass.component.css'
})
export class SubclassComponent {
  subclass: any;
  subclassSlug: any = '';

  constructor(
    private route: ActivatedRoute,
    private api: DndApiService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.subclassSlug = this.route.snapshot.paramMap.get('subclassSlug');
  }

  ngAfterViewInit(): void {
    if (this.subclassSlug) {
      this.api.getSubClassDetails(this.subclassSlug).subscribe((data) => {
        this.subclass = data;
        console.log(this.subclass);
      });
    }
  }

  getHtml(s: string) {
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(s));
  }

}
