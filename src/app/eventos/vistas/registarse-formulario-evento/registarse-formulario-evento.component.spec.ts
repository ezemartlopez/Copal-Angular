import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarseFormularioEventoComponent } from './registarse-formulario-evento.component';

describe('RegistarseFormularioEventoComponent', () => {
  let component: RegistarseFormularioEventoComponent;
  let fixture: ComponentFixture<RegistarseFormularioEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistarseFormularioEventoComponent]
    });
    fixture = TestBed.createComponent(RegistarseFormularioEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
