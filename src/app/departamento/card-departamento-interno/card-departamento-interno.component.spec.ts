import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDepartamentoInternoComponent } from './card-departamento-interno.component';

describe('CardDepartamentoInternoComponent', () => {
  let component: CardDepartamentoInternoComponent;
  let fixture: ComponentFixture<CardDepartamentoInternoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDepartamentoInternoComponent]
    });
    fixture = TestBed.createComponent(CardDepartamentoInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
