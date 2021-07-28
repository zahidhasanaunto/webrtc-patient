import { AuthQuery } from './../../@auth/state/auth.query';
import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoginRouterPermissionGuard implements CanActivate {
	constructor(private authQuery: AuthQuery, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!this.authQuery.isLoggedIn()) {
			return true;
		} else {
			this.router.navigate(['']);
			return false;
		}
	}
}
