import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacesComponent } from '../view-races/view-races.component';

describe('RacesComponent', () => {
  let component: RacesComponent;
  let fixture: ComponentFixture<RacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacesComponent]
    });
    fixture = TestBed.createComponent(RacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
