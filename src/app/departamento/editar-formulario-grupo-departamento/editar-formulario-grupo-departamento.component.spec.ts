import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFormularioGrupoDepartamentoComponent } from './editar-formulario-grupo-departamento.component';

describe('EditarFormularioGrupoDepartamentoComponent', () => {
  let component: EditarFormularioGrupoDepartamentoComponent;
  let fixture: ComponentFixture<EditarFormularioGrupoDepartamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFormularioGrupoDepartamentoComponent]
    });
    fixture = TestBed.createComponent(EditarFormularioGrupoDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
