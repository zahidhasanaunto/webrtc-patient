import { NotLoginPermissionGuard } from './../@shared/guard/not-login-permission.guard';
import { LoginRouterPermissionGuard } from './../@shared/guard/login-router-permission.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from '../@layout/custom-layout.component';
import { VexRoutes } from '../../@vex/interfaces/vex-route.interface';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: VexRoutes = [
  {
    path: '',
    redirectTo: 'patient',
  },
  // {
  // 	path: 'patient/login',
  // 	canActivate: [LoginRouterPermissionGuard],
  // 	loadChildren: () =>
  // 		import('../@auth/login/login.module').then((m) => m.LoginModule),
  // },
  // {
  // 	path: 'forgot-password',
  // 	canActivate: [LoginRouterPermissionGuard],
  // 	loadChildren: () =>
  // 		import('../@auth/forgot-password/forgot-password.module').then(
  // 			(m) => m.ForgotPasswordModule
  // 		),
  // },
  {
    path: 'patient/call/:doctorIdentifier',
    loadChildren: () =>
      import('../@module/call-ongoing/call-ongoing.module').then(
        (m) => m.CallOngoingModule
      ),
  },
  {
    path: 'patient',
    component: CustomLayoutComponent,
    // canActivate: [NotLoginPermissionGuard],
    children: [
      {
        path: '',
        redirectTo: 'first-advice',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../@module/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'call-details',
        loadChildren: () =>
          import('../@module/call-details/call-details.module').then(
            (m) => m.CallDetailsModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../@module/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'first-advice',
        loadChildren: () =>
          import('../@module/first-advice/first-advice.module').then(
            (m) => m.FirstAdviceModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'doctor',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'corrected',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule, QuicklinkModule],
})
export class AppRoutingModule {}
