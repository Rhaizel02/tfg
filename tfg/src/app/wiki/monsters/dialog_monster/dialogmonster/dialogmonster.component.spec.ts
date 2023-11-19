import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmonsterComponent } from './dialogmonster.component';

describe('DialogmonsterComponent', () => {
  let component: DialogmonsterComponent;
  let fixture: ComponentFixture<DialogmonsterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogmonsterComponent]
    });
    fixture = TestBed.createComponent(DialogmonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
