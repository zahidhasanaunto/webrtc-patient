import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
	declarations: [DeleteDialogComponent],
	imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class ComponentModule {}
