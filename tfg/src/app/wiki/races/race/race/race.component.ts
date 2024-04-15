import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DndApiService } from 'src/app/services/dnd_api/dnd-api.service';
import * as marked from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
})
export class RaceComponent implements OnInit {
  race: any;
  raceSlug: any = '';
  info: SafeHtml[] = [];
  x : string = '';
  constructor(
    private route: ActivatedRoute,
    private api: DndApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.raceSlug = this.route.snapshot.paramMap.get('raceSlug');
  }

  ngAfterViewInit(): void {
    if (this.raceSlug) {
      this.api.getRaceDetails(this.raceSlug).subscribe((data) => {
        this.race = data;
        this.x = this.race.desc.toString();
        this.processMarkdown();
      });
    }
  }

  processMarkdown() {
    this.info.push(
      this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(this.race.desc)
      )
    );
    this.info.push(
      this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(this.race.asi_desc.toString())
      )
    );
    this.info.push(
      this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(this.race.age.toString())
      )
    );
    this.info.push(
      this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(this.race.alignment.toString())
      )
    );
    this.info.push(
      this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(this.race.speed_desc.toString())
      )
    );
    this.info.push(
      this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(this.race.languages.toString())
      )
    );
    this.info.push(
      this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(this.race.vision.toString())
      )
    );
    this.info.push(
      this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(this.race.traits.toString())
      )
    );
    this.info.push(
      this.sanitizer.bypassSecurityTrustHtml(
        marked.parse(
          '**Source:** <a target=_blank class=text-blue-600 dark:text-blue-500 hover:underline href=' +
            this.race.document__url +
            '>' +
            this.race.document__title +
            '</a>'
        )
      )
    );

    if (this.race.subraces[0].name && Array.isArray(this.race.subraces)) {
      this.info.push(
        this.sanitizer.bypassSecurityTrustHtml(
          marked.parse('### **Subraces**\n')
        )
      );
      for (let subrace of this.race.subraces) {
        this.info.push(
          this.sanitizer.bypassSecurityTrustHtml(
            marked.parse('--- \n **Name:** ' + subrace.name.toString())
          )
        );
        this.info.push(
          this.sanitizer.bypassSecurityTrustHtml(
            marked.parse(subrace.asi_desc.toString())
          )
        );
        this.info.push(
          this.sanitizer.bypassSecurityTrustHtml(
            marked.parse(subrace.traits.toString())
          )
        );
        this.info.push(
          this.sanitizer.bypassSecurityTrustHtml(
            marked.parse(
              '**Source:** <a target=_blank class=text-blue-600 dark:text-blue-500 hover:underline href=' +
                subrace.document__url +
                '>' +
                subrace.document__title +
                '</a>'
            )
          )
        );
      }
    }
  }
}
