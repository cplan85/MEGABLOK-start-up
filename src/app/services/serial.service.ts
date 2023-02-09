import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, delay } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
valid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  constructor(private http: HttpClient) { }

  private serialUrl: string = environment.serialUrl;


  setSerial( serialNumber:string) {

    const url = this.serialUrl;
    const headers = new HttpHeaders()
    .set('x-token', 'true');

    return  this.http.get<AuthResponse>(url)
    .pipe(delay(1000),
      tap( resp => {
        console.log(resp, '<== respons from auth service')

        if (resp.valid) {
          console.log('Valid')
        
         }
      }),
      map( resp => resp.valid),
      catchError( err => of(err.error.msg))
    );

  }
}
