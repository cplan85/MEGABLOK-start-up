import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

enum BreakpointSizes {
  xl = "xl",
  lg = "lg",
  md = "md",
  sm ="sm",
  xs = "xs",
}

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  private _cols$: Subject<number> = new Subject();
  private _logoRowSpan$: Subject<number> = new Subject();
  private _formRowSpan$: Subject<number> = new Subject();
  cols: number = 6;
  logoRowSpan: number = 10;
  formRowSpan: number = 10;

  get cols$(): Observable<number> {
    return this._cols$.asObservable();
  }

  get logoRowSpan$(): Observable<number> {
    return this._logoRowSpan$.asObservable();
  }

  get formRowSpan$(): Observable<number> {
    return this._formRowSpan$.asObservable();
  }

  

  gridByBreakpoint = {
    xl: 6,
    lg: 6,
    md: 4,
    sm: 1,
    xs: 1
  }

  logoRowSpanBreakpoint = {
    xl: 10,
    lg: 10,
    md: 10,
    sm: 2,
    xs: 2
  }

  formRowSpanBreakpoint = {
    xl: 10,
    lg: 10,
    md: 10,
    sm: 8,
    xs: 8
  }

  setBreakpoints(screenSize: BreakpointSizes) {
    this._cols$.next(this.gridByBreakpoint[screenSize]);
    this._logoRowSpan$.next(this.logoRowSpanBreakpoint[screenSize]);
    this._formRowSpan$.next(this.formRowSpanBreakpoint[screenSize]);

  }

  setBreakpointsOnInit(cols: number, logoRowSpan: number, formRowSpan: number) {
    let innerWidth = window.innerWidth;
    if(innerWidth > 700) {
      cols = 6;
      logoRowSpan = 10;
      formRowSpan = 10;
    } else {
    cols = 1;
    }
  }

  constructor( private breakpointObserver: BreakpointObserver) {
    console.log("BreakpointService")
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.setBreakpoints(BreakpointSizes.xs)
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.setBreakpoints(BreakpointSizes.sm)
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.setBreakpoints(BreakpointSizes.md)

        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.setBreakpoints(BreakpointSizes.lg)

        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.setBreakpoints(BreakpointSizes.xl)
          this._cols$.next(this.gridByBreakpoint.xl);
          this.cols = this.gridByBreakpoint.xl;
          this.logoRowSpan = this.logoRowSpanBreakpoint.xl;
          this.formRowSpan = this.formRowSpanBreakpoint.xl;
          console.log(this.formRowSpan, "hoahoae")
        }
      }
    });
   }
}
