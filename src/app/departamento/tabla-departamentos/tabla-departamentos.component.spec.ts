import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDepartamentosComponent } from './tabla-departamentos.component';

describe('TablaDepartamentosComponent', () => {
  let component: TablaDepartamentosComponent;
  let fixture: ComponentFixture<TablaDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaDepartamentosComponent]
    });
    fixture = TestBed.createComponent(TablaDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
