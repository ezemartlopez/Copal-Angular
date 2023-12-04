import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEspaciosComponent } from './historial-espacios.component';

describe('HistorialEspaciosComponent', () => {
  let component: HistorialEspaciosComponent;
  let fixture: ComponentFixture<HistorialEspaciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialEspaciosComponent]
    });
    fixture = TestBed.createComponent(HistorialEspaciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
