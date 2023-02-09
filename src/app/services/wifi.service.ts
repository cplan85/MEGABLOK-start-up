import { AuthResponse } from './serial.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, of, tap, delay } from 'rxjs';
import { NetworksResponse } from '../models/networksResponse.model';


@Injectable({
  providedIn: 'root'
})
export class WifiService {

  private networksUrl: string = environment.networksUrl;
  private setWifiUrl: string = environment.setWifiUrl;

  constructor(private http: HttpClient) { }

  getNetworks( ) {

    const url = this.networksUrl;

    return  this.http.get<NetworksResponse>(url)
    .pipe(
      tap( resp => {
        console.log(resp, '<== respons from wifi service')
      }),
      map( resp => resp.networks),
      catchError( err => of(err.error.msg))
    );

  }

  setWifi(SSID:string, password: string ) {

    let params = new HttpParams();
    params = params.append('SSID', SSID);
    params = params.append('password', password);
    const url = this.setWifiUrl;

    return  this.http.get<AuthResponse>(url, {params})
    .pipe(
      delay(1000),
      tap( resp => {
        console.log(resp, '<== respons from wifi service')
        console.log(params)
      }),
      map( resp => resp.valid),
      catchError( err => of(err.error.msg))
    );

  }
}
