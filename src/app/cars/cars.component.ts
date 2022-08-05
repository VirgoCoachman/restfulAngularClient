import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CarDialogFormComponent} from "../car-dialog-form/car-dialog-form.component";
import {CarDataService} from "../services/api/car-data.service";
import {RentDataService} from "../services/api/rent-data.service";
import {RentDialogFormComponent} from "../rent-dialog-form/rent-dialog-form.component";

export interface ICar {
  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  couleur: string;
  disponible: boolean;
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars!: ICar[];
  dataSource!: MatTableDataSource<ICar>;
  displayedColumns : string[] = ['id', 'immatriculation', 'marque', 'modele', 'couleur', 'disponible', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private carDataService: CarDataService, private dialog: MatDialog, private rentDataService : RentDataService) {
    this.cars = [];
    this.dataSource = new MatTableDataSource<ICar>();
  }

  ngOnInit(): void {
    this.chargeAllCars();
  }

  public chargeAllCars() {
    this.carDataService.getAllCars().subscribe({
      next: (res)=>{
        // @ts-ignore
        this.dataSource = new MatTableDataSource<any>(res.voitures);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }


  apply_filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCar(element: ICar) {
    this.dialog.open(CarDialogFormComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(value => {
      if (value === 'updated') {
        this.ngOnInit();
      }
    })
  }

  deleteCar(element: ICar) {
    this.carDataService.deleteCar(element.id).subscribe({
      next: (res) => {
        alert("La voiture a été supprimée avec succès");
        this.ngOnInit();
      },
      error: (err) => {
        alert(err.toString());
      }
    })
  }

  setRent(element: any) {
    console.log(element);
    this.dialog.open(RentDialogFormComponent, {
      width: '30%',
      data: element
    });
  }


}
