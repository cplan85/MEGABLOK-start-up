import { SerialService } from './../../services/serial.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wifi-page',
  templateUrl: './wifi-page.component.html',
  styleUrls: ['./wifi-page.component.scss']
})
export class WifiPageComponent implements OnInit {

  serialForm: FormGroup = this.formBuilder.group({
    serial: ['', [Validators.required, Validators.minLength(6)]]

  })

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private serialService:SerialService) { }

  ngOnInit(): void {
  }

  setSerial() {
    const {serial} = this.serialForm.value;
        console.log(this.serialForm.value)
      
  
        this.serialService.setSerial(serial)
        .subscribe( isValid => {
          console.log(isValid, "Valid from set serial")
          if ( isValid === true ) {
            localStorage.setItem('serial', serial)
            this.router.navigateByUrl('/wifi-setup')
          } else {
            window.alert('This serial does not match any on file.')

          }
      })
  
    }

}
