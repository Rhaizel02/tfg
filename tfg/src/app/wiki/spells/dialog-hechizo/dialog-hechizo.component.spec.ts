import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHechizoComponent } from './dialog-hechizo.component';

describe('DialogHechizoComponent', () => {
  let component: DialogHechizoComponent;
  let fixture: ComponentFixture<DialogHechizoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogHechizoComponent]
    });
    fixture = TestBed.createComponent(DialogHechizoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
