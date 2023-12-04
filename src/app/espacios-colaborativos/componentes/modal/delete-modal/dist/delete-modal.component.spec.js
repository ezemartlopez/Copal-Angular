"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var delete_modal_component_1 = require("./delete-modal.component");
describe('DeleteModalComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [delete_modal_component_1.DeleteModalComponent]
        });
        fixture = testing_1.TestBed.createComponent(delete_modal_component_1.DeleteModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
