import { environment } from './../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { AuthInterceptor } from './../@shared/interceptor/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../../@vex/vex.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomLayoutModule } from '../@layout/custom-layout.module';
import { CallMinimizeComponent } from './call-minimize/call-minimize.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
@NgModule({
	declarations: [AppComponent, CallMinimizeComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,

		// Vex
		VexModule,
		CustomLayoutModule,

		//Custom add module
		DragDropModule,
		MatIconModule,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		AkitaNgRouterStoreModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
