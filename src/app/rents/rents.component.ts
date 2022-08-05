import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {RentDataService} from "../services/api/rent-data.service";

export interface IRent {
  id: number;
  date_location: Date;
  id_voiture: number;
  id_client: number;
}

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css']
})
export class RentsComponent implements OnInit {
  rents!: IRent[];
  dataSource!: MatTableDataSource<IRent>;
  displayedColumns: string[] = ['id', 'id_voiture', 'id_client', 'date_location', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rentDataService: RentDataService, private dialog: MatDialog) {
    this.rents = [];
    this.dataSource = new MatTableDataSource<IRent>();
  }

  ngOnInit(): void {
    this.chargeAllRents();
  }

  public chargeAllRents() {
    this.rentDataService.getAllRents().subscribe({
      next: (res)=>{
        // @ts-ignore
        this.dataSource = new MatTableDataSource<any>(res.locations);
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

  // editRent(element: IRent) {
  //   this.dialog.open(RentDialogFormComponent, {
  //     width: '30%',
  //     data: element
  //   });
  // }

  deleteRent(element: IRent) {
    this.rentDataService.deleteRent(element.id).subscribe({
      next: (res: any) => {
        alert("La location a été supprimée avec succès");
        this.ngOnInit();
      },
      error: (err: any) => {
        alert(err.toString());
      }
    })
  }

}
