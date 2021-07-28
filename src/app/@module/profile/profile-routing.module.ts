import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule, QuicklinkModule],
})
export class ProfileRoutingModule {}
