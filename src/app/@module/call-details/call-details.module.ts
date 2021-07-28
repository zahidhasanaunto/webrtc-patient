import { MatDialogModule } from '@angular/material/dialog';
import { CallDetailsRoutingModule } from './call-details-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CallDetailsComponent } from './call-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationComponent } from './medication/medication.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { DiagnosysComponent } from './diagnosys/diagnosys.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
	declarations: [
		CallDetailsComponent,
		MedicationComponent,
		LabTestComponent,
		DiagnosysComponent,
		NotesComponent,
	],
	imports: [
		CommonModule,
		CallDetailsRoutingModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
	],
})
export class CallDetailsModule {}
