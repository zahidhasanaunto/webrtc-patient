import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

const CALL_CONNECTING = 'CALL_CONNECTING'; // PUB
const CALL_CONNECTED = 'CALL_CONNECTED'; // SUB
const CALL_CANCELED = 'CALL_CANCELED'; // PUB
const CALL_STARTED = 'CALL_STARTED'; // PUB
const CALL_ENDED = 'CALL_ENDED'; // PUB+SUB
const OFFER = 'OFFER'; // PUB
const ANSWER = 'ANSWER'; // SUB
const CANDIDATE = 'CANDIDATE'; // SUB

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  EndPoint = environment.SOCKET_ENDPOINT;

  private socket: any;

  constructor() {
    this.socket = io(this.EndPoint);
  }

  connect(userIdentifier: any) {
    this.socket = io(this.EndPoint, { query: { userIdentifier } });
  }

  disconnect() {
    this.socket.disconnect();
  }

  close() {
    this.socket.close();
  }

  getSocket() {
    return this.socket;
  }

  onCallConnected(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on(CALL_CONNECTED, (data) => {
        observer.next(data);
      });
    });
  }

  onAnswer(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on(ANSWER, (data) => {
        observer.next(data);
      });
    });
  }

  onCallEnded(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on(CALL_ENDED, (data) => {
        observer.next(data);
      });
    });
  }

  onCandidate(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on(CALL_ENDED, (data) => {
        observer.next(data);
      });
    });
  }

  callStarted() {
    this.socket.emit(CALL_STARTED);
  }

  callEnded(doctorIdentifier: string, code: string) {
    this.socket.emit(CALL_ENDED, {
      doctorIdentifier,
      userType: 'PATIENT',
      code
    });
  }

  callCanceled() {
    this.socket.emit(CALL_CANCELED);
  }

  offer(doctorIdentifier: string, description: any) {
    this.socket.emit(OFFER, { doctorIdentifier, description });
  }

  callConnecting(callType: string, gender: string) {
    this.socket.emit(CALL_CONNECTING, { callType, gender });
  }

  candidate(data) {
    this.socket.emit(CANDIDATE, data);
  }
}
