import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEventov1Component } from './crear-eventov1.component';

describe('CrearEventov1Component', () => {
  let component: CrearEventov1Component;
  let fixture: ComponentFixture<CrearEventov1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEventov1Component]
    });
    fixture = TestBed.createComponent(CrearEventov1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
