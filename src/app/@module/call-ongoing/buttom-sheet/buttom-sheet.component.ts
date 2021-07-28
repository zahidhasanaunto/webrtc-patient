import { AddDialogComponent } from './../add-dialog/add-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'vex-buttom-sheet',
	templateUrl: './buttom-sheet.component.html',
	styleUrls: ['./buttom-sheet.component.scss'],
})
export class ButtomSheetComponent implements OnInit {
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

	previousConsultation(oldData: any) {
		const dialogRef = this.dialog.open(AddDialogComponent, {
			data: {
				mode: 'previousConcultation',
				oldData,
			},
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result.data) {
			}
		});
	}
}
