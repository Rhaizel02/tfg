import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicesComponent } from './dices.component';

describe('DicesComponent', () => {
  let component: DicesComponent;
  let fixture: ComponentFixture<DicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DicesComponent]
    });
    fixture = TestBed.createComponent(DicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
