import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAgregarComponent } from './card-agregar.component';

describe('CardAgregarComponent', () => {
  let component: CardAgregarComponent;
  let fixture: ComponentFixture<CardAgregarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAgregarComponent]
    });
    fixture = TestBed.createComponent(CardAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
