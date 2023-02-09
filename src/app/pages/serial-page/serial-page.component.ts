import { BreakpointService } from './../../services/breakpoint.service';
import { SerialService } from './../../services/serial.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-serial-page',
  templateUrl: './serial-page.component.html',
  styleUrls: ['./serial-page.component.scss']
})
export class SerialPageComponent implements OnInit {

  colSubscription!: Subscription
  formRowSubscription!: Subscription
  logoRowSubscription!: Subscription
  logoRowSpan: number = 10;
  formRowSpan: number = 10;
  cols: number = 6;
  rowHeight: string = "10vh";

  serialForm: FormGroup = this.formBuilder.group({
    serial: ['', [Validators.required, Validators.minLength(8)]]
  })


  showSpinner: boolean = false;
  constructor(
      private serialService:SerialService,
      private formBuilder: FormBuilder,
      private router: Router,
      private breakpointService: BreakpointService
      ) { 

       this.colSubscription = this.breakpointService.cols$.subscribe(result => {
          this.cols = result;
        })
        this.formRowSubscription =this.breakpointService.formRowSpan$.subscribe(result => {
          this.formRowSpan = result;
        })

        this.logoRowSubscription =this.breakpointService.logoRowSpan$.subscribe(result => {
          this.logoRowSpan = result;
        })
      }

  ngOnInit(): void {

    //  if (localStorage.getItem('serial') !== null) {
    //    this.router.navigateByUrl('/welcome')
    //  }
  }

  ngOnDestroy() {
    this.colSubscription.unsubscribe();
    this.formRowSubscription.unsubscribe()
    this.logoRowSubscription.unsubscribe()
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
            this.router.navigateByUrl('/welcome')
          } else {
            window.alert('This serial does not match any on file.')

          }
      })
  
    }

}
