import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
	selector: 'vex-card-details',
	templateUrl: './card-details.component.html',
	styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
	cardForm: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<CardDetailsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.cardForm = this.fb.group({});
	}

	close() {
		this.dialogRef.close();
	}

	onSubmit() {
		this.dialogRef.close();
	}
}
