import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSuperDepartamentoDepartamentoComponent } from './formulario-super-departamento-departamento.component';

describe('FormularioSuperDepartamentoDepartamentoComponent', () => {
  let component: FormularioSuperDepartamentoDepartamentoComponent;
  let fixture: ComponentFixture<FormularioSuperDepartamentoDepartamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioSuperDepartamentoDepartamentoComponent]
    });
    fixture = TestBed.createComponent(FormularioSuperDepartamentoDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
