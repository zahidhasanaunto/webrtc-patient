import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
	selector: 'vex-add-dialog',
	templateUrl: './add-dialog.component.html',
	styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
	pageTitle: string;

	constructor(
		public dialogRef: MatDialogRef<AddDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		if (this.data.mode === 'medication') {
			this.pageTitle = 'Add Medication';
		}
		if (this.data.mode === 'previousConcultation') {
			this.pageTitle = this.data.oldData.date;
		}
	}

	close() {
		this.dialogRef.close();
	}

	add() {}
	deduct() {}
}
