import { NgModule } from "@angular/core";
import { DialogConfirmDeleteComponent } from "./dialog-confirm-delete.component";
import { MatIconModule } from "@angular/material/icon";
import { DialogModule } from "@angular/cdk/dialog";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from "@angular/material/dialog";

@NgModule({
  declarations: [DialogConfirmDeleteComponent],
  imports: [MatIconModule, MatDialogModule, DialogModule, MatDialogModule],
  exports: [DialogConfirmDeleteComponent, MatDialogModule],
  providers: [
    // Agrega MAT_DIALOG_DATA como proveedor
    { provide: MAT_DIALOG_DATA, useValue: {} }, // Puedes usar un valor predeterminado vacío o configurar los valores iniciales según tus necesidades
  ],
})
export class dialogConfirmDeleteModuleModule {}
