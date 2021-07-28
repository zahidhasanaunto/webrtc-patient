import { untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from './../../@shared/service/auth.service';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';

@Component({
	selector: 'vex-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [fadeInUp400ms],
})
export class LoginComponent implements OnInit {
	form: FormGroup;

	inputType = 'password';
	visible = false;

	icVisibility = icVisibility;
	icVisibilityOff = icVisibilityOff;
	isLoading: boolean = false;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private snackbar: MatSnackBar,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.form = this.fb.group({
			phoneNumber: [
				'',
				[Validators.required, Validators.pattern(/^01[3-9][0-9]{8}$/)],
			],
			password: ['', [Validators.required]],
		});
	}

	send() {
		this.isLoading = true;
		this.authService
			.login(this.form.value)
			.pipe(untilDestroyed(this))
			.subscribe(
				(res: any) => {
					this.isLoading = false;
					if (res.success) {
						localStorage.setItem('accessToken', res.payload.accessToken);
						localStorage.setItem('refreshToken', res.payload.refreshToken);
						this.snackbar.open('User Login Successful', '', {
							horizontalPosition: 'end',
							verticalPosition: 'top',
							duration: 1500,
						});
						this.router.navigate(['/']);
					} else {
						this.snackbar.open('User Login Failed', '', {
							horizontalPosition: 'end',
							verticalPosition: 'top',
							duration: 1500,
						});
					}
				},
				(error: any) => {
					this.isLoading = false;
					this.form.reset();
					this.snackbar.open('User Login Failed', '', {
						horizontalPosition: 'end',
						verticalPosition: 'top',
						duration: 1500,
					});
				}
			);
	}

	toggleVisibility() {
		if (this.visible) {
			this.inputType = 'password';
			this.visible = false;
			this.cd.markForCheck();
		} else {
			this.inputType = 'text';
			this.visible = true;
			this.cd.markForCheck();
		}
	}
}
