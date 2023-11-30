import { Component, OnInit } from '@angular/core';
import { RuleInterface } from 'src/app/interfaces/rule-interface';
import { DndApiService } from 'src/app/services/dnd-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css'],
})
export class RulesComponent {
  rules: RuleInterface[] = [];

  constructor(private api: DndApiService, private router: Router) {}

  ngAfterViewInit() {
    this.rules = this.api.getRules();
  }

  RuleDetail(slug: string) {
    this.router.navigate(['/rules/', slug]);
  }
}
