import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDepartamentoEditarComponent } from './formulario-departamento-editar.component';

describe('FormularioDepartamentoEditarComponent', () => {
  let component: FormularioDepartamentoEditarComponent;
  let fixture: ComponentFixture<FormularioDepartamentoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioDepartamentoEditarComponent]
    });
    fixture = TestBed.createComponent(FormularioDepartamentoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
