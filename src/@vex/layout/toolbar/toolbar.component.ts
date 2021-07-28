import { OnlineStatus } from './toolbar-user/toolbar-user-dropdown/toolbar-user-dropdown.component';
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnInit,
} from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import icBookmarks from '@iconify/icons-ic/twotone-bookmarks';
import emojioneUS from '@iconify/icons-emojione/flag-for-flag-united-states';
import emojioneDE from '@iconify/icons-emojione/flag-for-flag-germany';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { ConfigService } from '../../services/config.service';
import { map } from 'rxjs/operators';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icAssignmentTurnedIn from '@iconify/icons-ic/twotone-assignment-turned-in';
import icBallot from '@iconify/icons-ic/twotone-ballot';
import icDescription from '@iconify/icons-ic/twotone-description';
import icAssignment from '@iconify/icons-ic/twotone-assignment';
import icReceipt from '@iconify/icons-ic/twotone-receipt';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import { NavigationService } from '../../services/navigation.service';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import { PopoverService } from '../../components/popover/popover.service';
import { MegaMenuComponent } from '../../components/mega-menu/mega-menu.component';
import icSearch from '@iconify/icons-ic/twotone-search';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icDoNotDisturb from '@iconify/icons-ic/twotone-do-not-disturb';
import icOfflineBolt from '@iconify/icons-ic/twotone-offline-bolt';
import { trackById } from 'src/@vex/utils/track-by';

@Component({
	selector: 'vex-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
	@Input() mobileQuery: boolean;

	@Input()
	@HostBinding('class.shadow-b')
	hasShadow: boolean;

	navigationItems = this.navigationService.items;

	isHorizontalLayout$ = this.configService.config$.pipe(
		map((config) => config.layout === 'horizontal')
	);
	isVerticalLayout$ = this.configService.config$.pipe(
		map((config) => config.layout === 'vertical')
	);
	isNavbarInToolbar$ = this.configService.config$.pipe(
		map((config) => config.navbar.position === 'in-toolbar')
	);
	isNavbarBelowToolbar$ = this.configService.config$.pipe(
		map((config) => config.navbar.position === 'below-toolbar')
	);

	icSearch = icSearch;
	icBookmarks = icBookmarks;
	emojioneUS = emojioneUS;
	emojioneDE = emojioneDE;
	icMenu = icMenu;
	icPersonAdd = icPersonAdd;
	icAssignmentTurnedIn = icAssignmentTurnedIn;
	icBallot = icBallot;
	icDescription = icDescription;
	icAssignment = icAssignment;
	icReceipt = icReceipt;
	icDoneAll = icDoneAll;
	icArrowDropDown = icArrowDropDown;

	trackById = trackById;

	statuses: OnlineStatus[] = [
		{
			id: 'online',
			label: 'Online',
			icon: icCheckCircle,
			colorClass: 'text-green',
		},
		{
			id: 'away',
			label: 'Away',
			icon: icAccessTime,
			colorClass: 'text-orange',
		},
		{
			id: 'dnd',
			label: 'Do not disturb',
			icon: icDoNotDisturb,
			colorClass: 'text-red',
		},
		{
			id: 'offline',
			label: 'Offline',
			icon: icOfflineBolt,
			colorClass: 'text-gray',
		},
	];

	activeStatus: OnlineStatus = this.statuses[0];

	constructor(
		private layoutService: LayoutService,
		private configService: ConfigService,
		private navigationService: NavigationService,
		private popoverService: PopoverService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {}

	openQuickpanel() {
		this.layoutService.openQuickpanel();
	}

	openSidenav() {
		this.layoutService.openSidenav();
	}

	openMegaMenu(origin: ElementRef | HTMLElement) {
		this.popoverService.open({
			content: MegaMenuComponent,
			origin,
			position: [
				{
					originX: 'start',
					originY: 'bottom',
					overlayX: 'start',
					overlayY: 'top',
				},
				{
					originX: 'end',
					originY: 'bottom',
					overlayX: 'end',
					overlayY: 'top',
				},
			],
		});
	}

	openSearch() {
		this.layoutService.openSearch();
	}

	setStatus(status: OnlineStatus) {
		this.activeStatus = status;
		this.cd.markForCheck();
	}
}
