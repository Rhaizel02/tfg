import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterCalculatorComponent } from './encounter-calculator.component';

describe('EncounterCalculatorComponent', () => {
  let component: EncounterCalculatorComponent;
  let fixture: ComponentFixture<EncounterCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncounterCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncounterCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
