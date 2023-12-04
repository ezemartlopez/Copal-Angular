import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGrupoDepartamentoComponent } from './formulario-grupo-departamento.component';

describe('FormularioGrupoDepartamentoComponent', () => {
  let component: FormularioGrupoDepartamentoComponent;
  let fixture: ComponentFixture<FormularioGrupoDepartamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioGrupoDepartamentoComponent]
    });
    fixture = TestBed.createComponent(FormularioGrupoDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
