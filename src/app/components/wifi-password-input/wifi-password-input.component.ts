import { WifiService } from './../../services/wifi.service';
import { Network } from './../../models/network.model';
import { Router } from '@angular/router';
import { Component, OnInit, Input,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerialService } from 'src/app/services/serial.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wifi-password-input',
  templateUrl: './wifi-password-input.component.html',
  styleUrls: ['./wifi-password-input.component.scss']
})
export class WifiPasswordInputComponent implements OnInit {

  @Input() network!: Network;
  @Output() outputValue: EventEmitter<boolean> = new EventEmitter();

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
      const ssid = this.network.SSID;
        this.outputValue.emit(true);
        this.wifiService.setWifi(ssid,password)
        .subscribe( isValid => {
          console.log(isValid, "Valid from set wifi")
          if ( isValid === true ) {
            console.log("outputValue", this.outputValue)
            this.router.navigateByUrl('/main-page')
          } else {
            this.outputValue.emit(false);
            window.alert('The password is not correct for this wifi network.')
          }
      })
  
    }

}
