import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleComponent } from './rule.component';

describe('RuleComponent', () => {
  let component: RuleComponent;
  let fixture: ComponentFixture<RuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleComponent]
    });
    fixture = TestBed.createComponent(RuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
