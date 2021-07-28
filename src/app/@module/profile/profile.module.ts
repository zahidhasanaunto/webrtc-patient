import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
	declarations: [ProfileComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
	],
})
export class ProfileModule {}
