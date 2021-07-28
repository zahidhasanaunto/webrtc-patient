import { AuthStore } from './../../@auth/state/auth.store';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly EndPoint = environment.API_ENDPOINT + 'auth/';

	constructor(
		private readonly http: HttpClient,
		private authStore: AuthStore,
		@Inject('persistStorage') private persistStorage
	) {}

	login(payload: any): Observable<any> {
		return this.http.post(`${this.EndPoint}panel_login`, payload).pipe(
			tap((res) => {
				this.authStore.update(res.payload);
			})
		);
	}

	logout() {
		this.authStore.update({
			accessToken: null,
			refreshToken: null,
			user: null,
		});
		this.persistStorage.clearStore();
	}
}
