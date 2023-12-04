import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReservacionComponent } from './formulario-reservacion.component';

describe('FormularioReservacionComponent', () => {
  let component: FormularioReservacionComponent;
  let fixture: ComponentFixture<FormularioReservacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioReservacionComponent]
    });
    fixture = TestBed.createComponent(FormularioReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
