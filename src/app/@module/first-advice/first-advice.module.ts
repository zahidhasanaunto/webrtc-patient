import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FirstAdviceRoutingModule } from './first-advice-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstAdviceComponent } from './first-advice.component';
import { MatButtonModule } from '@angular/material/button';
import { CardDetailsComponent } from './card-details/card-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [FirstAdviceComponent, CardDetailsComponent],
	imports: [
		CommonModule,
		FirstAdviceRoutingModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
		MatTooltipModule,
	],
})
export class FirstAdviceModule {}
