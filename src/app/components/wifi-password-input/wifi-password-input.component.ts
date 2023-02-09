import { WifiService } from './../../services/wifi.service';
import { Network } from './../../models/network.model';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerialService } from 'src/app/services/serial.service';

@Component({
  selector: 'app-wifi-password-input',
  templateUrl: './wifi-password-input.component.html',
  styleUrls: ['./wifi-password-input.component.scss']
})
export class WifiPasswordInputComponent implements OnInit {

  @Input() network!: Network;

  wifiForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]]

  })

  constructor( private wifiService: WifiService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.network, "at child")
  }

  setWifi() {
    const {password} = this.wifiForm.value;
        console.log(this.wifiForm.value)
      const ssid = this.network.SSID;
  
        this.wifiService.setWifi(ssid,password)
        .subscribe( isValid => {
          console.log(isValid, "Valid from set wifi")
          if ( isValid === true ) {
            this.router.navigateByUrl('/main-page')
          } else {
            window.alert('The password is not correct for this wifi network.')

          }
      })
  
    }

}
