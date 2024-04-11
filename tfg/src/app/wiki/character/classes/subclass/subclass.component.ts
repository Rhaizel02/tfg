import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';
import { DndApiService } from 'src/app/services/dnd_api/dnd-api.service';
@Component({
  selector: 'app-subclass',
  templateUrl: './subclass.component.html',
  styleUrl: './subclass.component.css'
})
export class SubclassComponent {
  aux: any[] = [];
  subclass: any;
  classSlug : any = '';
  subclassSlug: any = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dndApiService: DndApiService
  ) {}

  ngOnInit(): void {
    this.subclassSlug = this.route.snapshot.paramMap.get('subclassSlug');
    this.classSlug = this.route.snapshot.paramMap.get('classSlug');
  }

  ngAfterViewInit(): void {
    this.dndApiService.getSubclassDetails(this.classSlug, this.subclassSlug).subscribe((data: any) => {
      console.log(data);
      this.subclass = data;
    });
  }

  getHtml(s: string) {
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(s));
  }

}
