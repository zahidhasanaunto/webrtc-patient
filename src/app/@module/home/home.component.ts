import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'vex-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit(): void {}

	goFirstAdvice() {
		this.router.navigate(['first-advice']);
	}
}
