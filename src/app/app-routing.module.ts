import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ClientsComponent} from "./clients/clients.component";
import {RentsComponent} from "./rents/rents.component";
import {CarsComponent} from "./cars/cars.component";
import {AboutComponent} from "./about/about.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'rents', component: RentsComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
