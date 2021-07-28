import { SocketService } from './../../@shared/service/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { scaleInOutAnimation } from './../../../@vex/animations/scale-in-out.animation';
import { ButtomSheetComponent } from './buttom-sheet/buttom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import {
  Component,
  HostListener,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-call-ongoing',
  templateUrl: './call-ongoing.component.html',
  styleUrls: ['./call-ongoing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [scaleInOutAnimation],
})
export class CallOngoingComponent implements OnInit, AfterViewInit {
  public innerHeight: any;
  isMicrophone = true;
  isCallRuning = true;

  doctorIdentifier: any;

  localVideo: any;
  @ViewChild('me')
  set _localVideo(el: ElementRef) {
    if (el) {
      this.localVideo = el.nativeElement;
    }
  }

  remoteVideo: any;
  @ViewChild('remote')
  set _remoteVideo(el: ElementRef) {
    if (el) {
      this.remoteVideo = el.nativeElement;
    }
  }

  localStream: any;
  remoteStream: any;

  config = {
    iceServers: environment.ICE_SERVERS,
  };
  constraints = {
    audio: true,
    video: true,
  };

  peerConnection: any;

  constructor(
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.detectScreenSize();
    this.activatedRoute.params.subscribe((params) => {
      this.doctorIdentifier = params.doctorIdentifier;

      console.log(this.doctorIdentifier);
    });

    this.initSocketListeners();
  }

  ngAfterViewInit(): void {
    this.getUserMedia();
  }

  initSocketListeners() {
    this.socketService.onAnswer().subscribe((data) => {
      this.onAnswer(data.doctorIdentifier, data.description);
    });

    this.socketService.onCandidate().subscribe((data) => {
      this.onCandidate(data.description);
    });

    this.socketService.onCallEnded().subscribe((data) => {
      this.stopConsultation();
    });
  }

  stopConsultation() {
    console.log('STOP CONSULTATION');
    // tslint:disable-next-line:no-unused-expression
    this.localStream &&
      this.localStream.getTracks().forEach((track) => track.stop());
    // tslint:disable-next-line:no-unused-expression
    this.remoteStream &&
      this.remoteStream.getTracks().forEach((track) => track.stop());
  }

  onCandidate(description: any) {
    this.peerConnection
      .addIceCandidate(new RTCIceCandidate(description))
      .catch((e) => console.error(e));
  }

  onAnswer(doctorIdentifier: string, description: any) {
    console.log('onAnswer', doctorIdentifier);
    this.peerConnection.setRemoteDescription(description);
  }

  createOffer(doctorIdentifier: string) {
    console.log('createOffer', doctorIdentifier);

    if (
      !(this.localVideo instanceof HTMLVideoElement) ||
      !this.localVideo.srcObject
    ) {
      console.log('returnedddddddddddd');
      return;
    }

    const peerConnection: any = new RTCPeerConnection(this.config);
    this.peerConnection = peerConnection;

    if (this.localVideo instanceof HTMLVideoElement) {
      this.peerConnection.addStream(this.localVideo.srcObject);
    }

    this.peerConnection
      .createOffer()
      .then((sdp) => this.peerConnection.setLocalDescription(sdp))
      .then(() => {
        console.log('HERE');
        this.socketService.offer(
          doctorIdentifier,
          this.peerConnection.localDescription
        );
      });

    this.peerConnection.onaddstream = (event) =>
      this.handleRemoteStreamAdded(event.stream);

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socketService.candidate({
          userType: 'PATIENT',
          doctorIdentifier: this.doctorIdentifier,
          description: event.candidate,
        });
      }
    };
  }

  handleRemoteStreamAdded(stream) {
    this.remoteStream = stream;
    this.remoteVideo.srcObject = stream;
  }

  getUserMedia() {
    if (this.localVideo instanceof HTMLVideoElement) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.getUserMediaSuccess.bind(this))
        .catch(this.getUserMediaError.bind(this));
    }
  }

  getUserMediaSuccess(stream) {
    this.localStream = stream;

    // this.peerConnection = new RTCPeerConnection(this.config);

    // for (const track of stream.getTracks()) {
    //   this.peerConnection.addTrack(track);
    // }

    
    // this.localStream.getVideoTracks()[0].enabled = true;
    if (this.localVideo instanceof HTMLVideoElement) {
      // tslint:disable-next-line:no-unused-expression
      !this.localVideo.srcObject && (this.localVideo.srcObject = stream);
      this.createOffer(this.doctorIdentifier);
    }
  }

  getUserMediaError(error) {
    console.log('GET USER MEDIA ERROR => ', error);
  }

  @HostListener('window:resize', [])
  public onResize() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    this.innerHeight = window.innerHeight;
  }

  changeMicrophone() {
    this.isMicrophone = !this.isMicrophone;
  }

  addMedication() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        mode: 'medication',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
      }
    });
  }

  previousConsultation(oldData: any) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        mode: 'previousConcultation',
        oldData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
      }
    });
  }

  callEnd() {
    // this.isCallRuning = false;
    this.router.navigateByUrl('/patient/call-details/12522/madication');
  }

  mobileDrower() {
    this._bottomSheet.open(ButtomSheetComponent, {
      panelClass: 'my-bottom-dialog',
    });
  }
  minimizeCall() {}
}
