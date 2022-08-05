import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IClient} from "../../clients/clients.component";
import {ICar} from "../../cars/cars.component";

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  private CAR_ENDPOINT_API = "http://localhost:5000/api/voitures";

  constructor(private httpClient: HttpClient) { }

  public getAllCars() {
    return this.httpClient.get(this.CAR_ENDPOINT_API);
  }

  public getCarById(id: number){
    return this.httpClient.get(this.CAR_ENDPOINT_API + "/" + id);
  }

  public postCar(data: ICar){
    return this.httpClient.post(this.CAR_ENDPOINT_API, data);
  }

  public updateCar(data: ICar, id: number){
    return this.httpClient.put(this.CAR_ENDPOINT_API + "/" + id, data);
  }

  public deleteCar(id: number){
    return this.httpClient.delete(this.CAR_ENDPOINT_API + "/" + id);
  }
}
