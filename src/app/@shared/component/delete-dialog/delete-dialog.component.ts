import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'vex-delete-dialog',
	templateUrl: './delete-dialog.component.html',
	styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
	constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>) {}

	ngOnInit() {
		this.dialogRef
			.backdropClick()
			.subscribe(() => this.dialogRef.close({ success: false }));
	}

	yesBtn() {
		this.dialogRef.close({ success: true });
	}

	noBtn() {
		this.dialogRef.close({ success: false });
	}
}
