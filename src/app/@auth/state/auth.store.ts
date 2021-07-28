import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
export interface AuthState {
	accessToken: string;
	refreshToken: string;
	user: any;
}

export function initialState(): AuthState {
	return {
		accessToken: null,
		refreshToken: null,
		user: null,
	};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
	constructor() {
		super(initialState());
	}
}
