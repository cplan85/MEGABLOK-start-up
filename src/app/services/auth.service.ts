import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  verifyAuthentication():boolean {

    if(!localStorage.getItem('ssid') || !localStorage.getItem('wifiPassword') ) {
      return false
    }
    return true;
  }
}
