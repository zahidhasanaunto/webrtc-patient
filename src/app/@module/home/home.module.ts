import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatRippleModule } from '@angular/material/core';
@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, MatRippleModule],
})
export class HomeModule {}
