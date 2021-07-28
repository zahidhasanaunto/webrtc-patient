import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CallOngoingRoutingModule } from './call-ongoing-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallOngoingComponent } from './call-ongoing.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { ButtomSheetComponent } from './buttom-sheet/buttom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
	declarations: [
		CallOngoingComponent,
		AddDialogComponent,
		ButtomSheetComponent,
	],
	imports: [
		CommonModule,
		CallOngoingRoutingModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
		MatCheckboxModule,
		MatRippleModule,
		MatBottomSheetModule,
	],
})
export class CallOngoingModule {}
