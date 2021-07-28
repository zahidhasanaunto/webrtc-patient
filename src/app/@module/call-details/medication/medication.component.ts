import { AddDialogComponent } from './../../call-ongoing/add-dialog/add-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'vex-medication',
	templateUrl: './medication.component.html',
	styleUrls: ['./medication.component.scss'],
})
export class MedicationComponent implements OnInit {
	constructor(private dialog: MatDialog) {}

	ngOnInit(): void {}

	addMedication() {
		const dialogRef = this.dialog.open(AddDialogComponent, {
			data: {
				mode: 'medication',
			},
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result.data) {
			}
		});
	}
}
