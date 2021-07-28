import { AuthState, AuthStore } from './auth.store';
import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
	isLoggedIn$ = this.select((state) => toBoolean(state.accessToken));
	name$ = this.select((state) => state);

	constructor(protected store: AuthStore) {
		super(store);
	}

	isLoggedIn() {
		return !!this.getValue().accessToken;
	}
}
