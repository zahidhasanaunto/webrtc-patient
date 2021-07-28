import { SocketService } from './../../@shared/service/socket.service';
import { Router } from '@angular/router';
import { CardDetailsComponent } from './card-details/card-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vex-first-advice',
  templateUrl: './first-advice.component.html',
  styleUrls: ['./first-advice.component.scss'],
})
export class FirstAdviceComponent implements OnInit {
  isAudioCall: boolean = null;
  isMaleDoctor: boolean = null;
  sessionOpen: boolean = null;
  timer;

  doctorIdentifier: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.socketService.connect('ovi@gmail.com');
  }

  callManagement(mode: string) {
    if (mode === 'audio') {
      this.isAudioCall = true;
    } else if (mode === 'video') {
      this.isAudioCall = false;
    }
  }

  doctorManagement(mode: string) {
    if (mode === 'male') {
      this.isMaleDoctor = true;
    } else if (mode === 'female') {
      this.isMaleDoctor = false;
    }
  }

  addCard() {
    const dialogRef = this.dialog.open(CardDetailsComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
      }
    });
  }

  connecting() {
    this.sessionOpen = false;

    this.socketService.callConnecting(
      this.isAudioCall ? 'AUDIO' : 'VIDEO',
      this.isMaleDoctor ? 'Male' : 'Female'
    );

    this.socketService.onCallConnected().subscribe((result: any) => {
      this.doctorIdentifier = result.doctorIdentifier;

      this.sessionOpen = true;
    });
    // this.timer = setTimeout(() => {
    //   this.sessionOpen = true;
    // }, 10000);
  }

  cancelConnect() {
    clearTimeout(this.timer);
    this.sessionOpen = null;
  }

  startSession() {
    this.router.navigate([`/patient/call/${this.doctorIdentifier}`]);
  }
}
