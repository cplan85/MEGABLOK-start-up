import { Network } from './../../models/network.model';
import { WifiService } from './../../services/wifi.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSelectionList } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/typings';

@Component({
  selector: 'app-wifi-page',
  templateUrl: './wifi-page.component.html',
  styleUrls: ['./wifi-page.component.scss']
})
export class WifiPageComponent implements OnInit {

  @ViewChild(MatSelectionList, {static: true})
//private selectionList!: MatSelectionList;

  serialForm: FormGroup = this.formBuilder.group({
    serial: ['', [Validators.required, Validators.minLength(8)]]

  })

  networks: Network[] = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private wifiService:WifiService) { }

  ngOnInit(): void {
  //   this.selectionList.selectionChange.subscribe((s: MatSelectionListChange) => {          

  //     this.selectionList.deselectAll();
  //     s.option.selected = true;
  // });
    this.getNetworks()
  }

  toggleValue(value:string) {
   // console.log('clicked', this.selectionList.selectedOptions.selected[0].value)
  }

  getNetworks() {
    this.wifiService.getNetworks().subscribe(networks => {
      this.networks = networks;
    })
  }

}
