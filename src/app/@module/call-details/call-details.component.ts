import { Router } from '@angular/router';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';

@Component({
	selector: 'vex-call-details',
	templateUrl: './call-details.component.html',
	styleUrls: ['./call-details.component.scss'],
})
export class CallDetailsComponent implements OnInit {
	public innerHeight: any;
	constructor(private router: Router) {}

	ngOnInit(): void {}
	back() {
		this.router.navigate(['']);
	}
}
