import { inject } from "@angular/core/testing";
import { SocioService } from "./../SocioService/socioService.service";
import { Component, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-dialog-confirm-delete",
  templateUrl: "./dialog-confirm-delete.component.html",
})
export class DialogConfirmDeleteComponent {
  constructor(
    private dialogRef: MatDialog,
    private router: Router,
    private socioService: SocioService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {}

  onDeleteClick(): void {
    let id = this.data;
    this.socioService.deleteSocio(id).subscribe();
    this.dialogRef.closeAll(); //Ojo que esto cierra TODOS los modals.
    //this.router.navigate(["/gestion-de-socios"]);
    location.reload();
  }
}
