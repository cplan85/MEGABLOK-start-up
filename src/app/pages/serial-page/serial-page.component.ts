import { SerialService } from './../../services/serial.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serial-page',
  templateUrl: './serial-page.component.html',
  styleUrls: ['./serial-page.component.scss']
})
export class SerialPageComponent implements OnInit {

  serialForm: FormGroup = this.formBuilder.group({
    serial: ['', [Validators.required, Validators.minLength(6)]]

  })
  showSpinner: boolean = false;
  constructor(private serialService:SerialService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // if (localStorage.getItem('serial') !== null) {
    //   this.router.navigateByUrl('/wifi-setup')
    // }
  }

  setSerial() {
    const {serial} = this.serialForm.value;
        console.log(this.serialForm.value)
      
        this.showSpinner = true;
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
