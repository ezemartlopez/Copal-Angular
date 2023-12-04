import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministracionComponent } from "./administracion.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { DialogModule } from "@angular/cdk/dialog";
import { DialogBodyComponent } from "../dialog-body/dialog-body.component";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterLink, RouterOutlet } from "@angular/router";
import { SearchPipe } from "../search.pipe";
import {VerSocioComponent} from "../ver-socio/ver-socio.component";

@NgModule({
  declarations: [
    AdministracionComponent,
    DialogBodyComponent,
    SearchPipe,
    VerSocioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    DialogModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
  ],
  exports: [
    AdministracionComponent,
    FormsModule,
    DialogBodyComponent,
  ],
  providers: [
    // Agrega MAT_DIALOG_DATA como proveedor
    { provide: MAT_DIALOG_DATA, useValue: {} }, // Puedes usar un valor predeterminado vacío o configurar los valores iniciales según tus necesidades
  ],
})
export class AdministracionModuleModule {}
