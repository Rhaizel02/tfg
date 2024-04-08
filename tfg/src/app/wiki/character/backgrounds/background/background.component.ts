import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DndApiService } from 'src/app/services/dnd_api/dnd-api.service';
import * as marked from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
})
export class BackgroundComponent {
  background: any;
  backgroundSlug: any = '';
  backgroundInfo: SafeHtml[] = [];
  constructor(
    private route: ActivatedRoute,
    private api: DndApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.backgroundSlug = this.route.snapshot.paramMap.get('backgroundSlug');
  }

  ngAfterViewInit(): void {
    if (this.backgroundSlug) {
      this.api.getBackgroundDetails(this.backgroundSlug).subscribe((data) => {
        this.background = data;
        this.processMarkdown();
      });
    }
  }

  processMarkdown() {
    this.backgroundInfo = [];
    this.addMarkdown(this.background.desc);
    this.addMarkdownItem(
      'Skills Proficiency',
      this.background.skill_proficiencies
    );
    this.addMarkdownItem(
      'Tools Proficiency',
      this.background.tool_proficiencies
    );
    this.addMarkdownItem('Languages', this.background.languages);
    this.addMarkdownItem('Equipment', this.background.equipment);
    this.addMarkdownItem('Feature', this.background.feature);
    this.addMarkdown(this.background.feature_desc);
    this.addMarkdown(this.background.suggested_characteristics);
  }

  addMarkdown(text: string) {
    this.backgroundInfo.push(
      this.sanitizer.bypassSecurityTrustHtml(marked.parse(text))
    );
  }

  addMarkdownItem(title: string, content: string) {
    if (content) {
      const formattedText = `<strong>${title}: </strong>${content}`;
      this.addMarkdown(formattedText);
    }
  }
}
