import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DndApiService } from 'src/app/services/dnd_api/dnd-api.service';
import * as marked from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css'],
})
export class RuleComponent {
  rule: any;
  ruleSlug: any = '';
  ruleInfo: SafeHtml[] = [];
  constructor(
    private route: ActivatedRoute,
    private api: DndApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.ruleSlug = this.route.snapshot.paramMap.get('ruleSlug');
  }

  ngAfterViewInit(): void {
    if (this.ruleSlug) {
      this.api.getRuleDetails(this.ruleSlug).subscribe((data) => {
        this.rule = data;
        this.processMarkdown();
      });
    }
    
  }

  processMarkdown() {
    this.ruleInfo.push(this.sanitizer.bypassSecurityTrustHtml(marked.parse(this.rule.desc.toString())));
  }
}
