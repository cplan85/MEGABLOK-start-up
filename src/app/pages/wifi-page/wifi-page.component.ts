import { BreakpointService } from './../../services/breakpoint.service';
import { Network } from './../../models/network.model';
import { WifiService } from './../../services/wifi.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wifi-page',
  templateUrl: './wifi-page.component.html',
  styleUrls: ['./wifi-page.component.scss']
})
export class WifiPageComponent implements OnInit {

  showSpinner:boolean = false;
  logoRowSpan!: number;
  formRowSpan!: number;
  cols!: number;
  rowHeight: string = "10vh";

  serialForm: FormGroup = this.formBuilder.group({
    serial: ['', [Validators.required, Validators.minLength(8)]]

  })

  networks: Network[] = [];

  constructor(private formBuilder: FormBuilder,
    private wifiService:WifiService,
    private breakpointService: BreakpointService
    ) { 
      this.breakpointService.cols$.subscribe(result => {
        this.cols = result;
      })
      this.breakpointService.formRowSpan$.subscribe(result => {
        this.formRowSpan = result;
      })

      this.breakpointService.logoRowSpan$.subscribe(result => {
        this.logoRowSpan = result;
      })
    }

  ngOnInit(): void {
    this.breakpointService.setBreakpointsOnInit(this.cols, this.logoRowSpan, this.formRowSpan)

    let innerWidth = window.innerWidth;
    if(innerWidth > 960) {
      this.cols = 6;
      this.logoRowSpan = 10;
      this.formRowSpan = 10;
    } 
    
    else {
      this.cols = 1;
      this.logoRowSpan = 1;
      this.formRowSpan = 9;
    }

    this.getNetworks()
  }

  setWifiImgSrc(SignalStrength: number) {
    if (SignalStrength > 70) {
      return `./assets/wifi-75.svg`
    } else if (SignalStrength >30) {
      return `./assets/wifi-50.svg`
    }
    else return `./assets/wifi-25.svg`
    }
  

  getNetworks() {
    this.wifiService.getNetworks().subscribe(networks => {
      this.networks = networks;
    })
  }

}
