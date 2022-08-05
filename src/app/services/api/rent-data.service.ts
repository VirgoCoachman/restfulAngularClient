import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRent} from "../../rents/rents.component";

@Injectable({
  providedIn: 'root'
})
export class RentDataService {

  private RENT_ENDPOINT_API = "http://localhost:5000/api/voitures/locations";

  constructor(private httpClient: HttpClient) { }

  public getAllRents() {
    return this.httpClient.get(this.RENT_ENDPOINT_API);
  }

  public getRentById(id: number){
    return this.httpClient.get(this.RENT_ENDPOINT_API + "/" + id);
  }

  public postRent(data: any){
    return this.httpClient.post(this.RENT_ENDPOINT_API, data);
  }

  public updateRent(data: IRent){
    return this.httpClient.put(this.RENT_ENDPOINT_API, data);
  }

  public deleteRent(id: number){
    return this.httpClient.delete(this.RENT_ENDPOINT_API + "/" + id);
  }

}
