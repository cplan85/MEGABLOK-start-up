import { WifiService } from './../../services/wifi.service';
import { Network } from './../../models/network.model';
import { Router } from '@angular/router';
import { Component, Input,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wifi-password-input',
  templateUrl: './wifi-password-input.component.html',
  styleUrls: ['./wifi-password-input.component.scss']
})
export class WifiPasswordInputComponent {

  @Input() network!: Network;
  @Output() outputValue: EventEmitter<boolean> = new EventEmitter();

  wifiForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]]

  })

  constructor( private wifiService: WifiService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  setWifi() {
    const {password} = this.wifiForm.value;
      const ssid = this.network.SSID;
        this.outputValue.emit(true);
        this.wifiService.setWifi(ssid,password)
        .subscribe( isValid => {
          if ( isValid === true ) {
            localStorage.setItem('ssid', ssid)
            localStorage.setItem('wifiPassword', password)
            this.router.navigateByUrl('/main-page')
          } else {
            this.outputValue.emit(false);
            window.alert('The password is not correct for this wifi network.')
          }
      })
  
    }

}
