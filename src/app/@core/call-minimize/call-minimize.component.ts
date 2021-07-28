import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'vex-call-minimize',
	templateUrl: './call-minimize.component.html',
	styleUrls: ['./call-minimize.component.scss'],
})
export class CallMinimizeComponent implements OnInit {
	dragPosition = { x: 0, y: 0 };

	constructor() {}

	ngOnInit(): void {}

	@HostListener('window:resize', [])
	public onResize() {
		this.detectScreenSize();
	}

	ngAfterViewInit() {
		this.detectScreenSize();
	}

	private detectScreenSize() {
		this.dragPosition.x = window.innerWidth - 250;
		this.dragPosition.y = window.innerHeight - 320;
	}

	clickBig() {
		console.log('big screen');
	}
}
