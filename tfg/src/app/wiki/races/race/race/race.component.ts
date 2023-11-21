import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DndApiService } from 'src/app/services/dnd-api.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
})
export class RaceComponent implements OnInit {
  race: any;
  constructor(private route: ActivatedRoute, private api: DndApiService) {}

  ngOnInit() {
    let raceSlug = this.route.snapshot.paramMap.get('raceSlug');
    if (raceSlug) {
      this.api.getRaceDetails(raceSlug).subscribe((data) => {
        this.race = data;
      });
    } else {
      console.log("not a race: "+raceSlug);
    }
  }
}
