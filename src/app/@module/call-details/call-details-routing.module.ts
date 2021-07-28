import { NotesComponent } from './notes/notes.component';
import { DiagnosysComponent } from './diagnosys/diagnosys.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { MedicationComponent } from './medication/medication.component';
import { CallDetailsComponent } from './call-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';

const routes: Routes = [
	{
		path: ':id',
		component: CallDetailsComponent,
		children: [
			{
				path: '',
				redirectTo: 'madication',
			},
			{
				path: 'madication',
				component: MedicationComponent,
			},
			{
				path: 'lab-test',
				component: LabTestComponent,
			},
			{
				path: 'diagnosys',
				component: DiagnosysComponent,
			},
			{
				path: 'notes',
				component: NotesComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule, QuicklinkModule],
})
export class CallDetailsRoutingModule {}
