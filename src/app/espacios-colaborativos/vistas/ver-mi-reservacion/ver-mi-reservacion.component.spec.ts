import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiReservacionComponent } from './ver-mi-reservacion.component';

describe('VerMiReservacionComponent', () => {
  let component: VerMiReservacionComponent;
  let fixture: ComponentFixture<VerMiReservacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerMiReservacionComponent]
    });
    fixture = TestBed.createComponent(VerMiReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
