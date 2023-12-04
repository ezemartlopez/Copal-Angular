import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDepartamentoComponent } from './ver-departamento.component';

describe('VerDepartamentoComponent', () => {
  let component: VerDepartamentoComponent;
  let fixture: ComponentFixture<VerDepartamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerDepartamentoComponent]
    });
    fixture = TestBed.createComponent(VerDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
