import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosColaborativosComponent } from './espacios-colaborativos.component';

describe('EspaciosColaborativosComponent', () => {
  let component: EspaciosColaborativosComponent;
  let fixture: ComponentFixture<EspaciosColaborativosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaciosColaborativosComponent]
    });
    fixture = TestBed.createComponent(EspaciosColaborativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
