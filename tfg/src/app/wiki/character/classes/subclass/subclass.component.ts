import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.subclassSlug = this.route.snapshot.paramMap.get('subclassSlug');
  }

  ngAfterViewInit(): void {
    
  }

  getHtml(s: string) {
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(s));
  }

}
