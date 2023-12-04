"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var registarse_formulario_evento_component_1 = require("./registarse-formulario-evento.component");
describe('RegistarseFormularioEventoComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [registarse_formulario_evento_component_1.RegistarseFormularioEventoComponent]
        });
        fixture = testing_1.TestBed.createComponent(registarse_formulario_evento_component_1.RegistarseFormularioEventoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
