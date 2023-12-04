"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var edit_modal_component_1 = require("./edit-modal.component");
describe('EditModalComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [edit_modal_component_1.EditModalComponent]
        });
        fixture = testing_1.TestBed.createComponent(edit_modal_component_1.EditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
