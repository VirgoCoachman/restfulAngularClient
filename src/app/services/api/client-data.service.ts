import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {IClient} from "../../clients/clients.component";

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private USER_ENDPOINT_API = "http://localhost:5000/api/clients";

  constructor(private httpClient: HttpClient) { }

  public getAllClients(){
    return this.httpClient.get(this.USER_ENDPOINT_API);
  }

  public getClientById(id: number){
    return this.httpClient.get(this.USER_ENDPOINT_API + "/" + id);
  }

  public postClient(data: IClient){
    return this.httpClient.post(this.USER_ENDPOINT_API, data);
  }

  public updateClient(data: any, id: number){
    return this.httpClient.put(this.USER_ENDPOINT_API + "/" + id, data);
  }

  public deleteClient(id: number){
    return this.httpClient.delete(this.USER_ENDPOINT_API + "/" + id);
  }
}
