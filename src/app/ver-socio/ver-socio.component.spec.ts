import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VerSocioComponent } from "./ver-socio.component";

describe("VerSocioComponent", () => {
  let component: VerSocioComponent;
  let fixture: ComponentFixture<VerSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerSocioComponent],
    });
    fixture = TestBed.createComponent(VerSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
