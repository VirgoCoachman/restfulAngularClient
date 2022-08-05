import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilFunctionsService {

  constructor() { }

  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  public getDateFromDateTime(dt: Date) {
    var date = new Date(dt);
    return date.getFullYear() +'-'+ this.padTo2Digits(date.getMonth()) + '-' + this.padTo2Digits(date.getDate());
  }
}
