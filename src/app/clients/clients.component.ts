import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ClientDataService} from "../services/api/client-data.service";
import {MatDialog} from "@angular/material/dialog";
import {ClientsDialogFormComponent} from "../clients-dialog-form/clients-dialog-form.component";
import { Router } from "@angular/router";

export interface IClient {
  id: number;
  nom: string;
  prenom: string;
  date_naissance: Date;
  email: string;
  adresse: string;
  telephone: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

// export class ClientsComponent implements AfterViewInit {
export class ClientsComponent implements OnInit {
  clients: IClient[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'date_naissance', 'email', 'telephone', 'adresse', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientDataService: ClientDataService, private dialog: MatDialog, private router: Router) {
    this.clients = [];
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.chargeAllClients();
  }

  apply_filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

// ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  editClient(element: any) {
    this.dialog.open(ClientsDialogFormComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(value => {
      console.log("editClientForm ===> " +value);
      if (value === 'updated') {
        this.ngOnInit();
      }
    })
  }

  deleteClient(element: IClient) {
    this.clientDataService.deleteClient(element.id).subscribe({
      next: (res) => {
        alert("Le client '" + element.prenom + " " + element.nom + "' a été supprimée avec succès");
        this.ngOnInit();
      },
      error: (err) => {
        alert(err.toString());
      }
    })
  }

  public chargeAllClients() {
    this.clientDataService.getAllClients().subscribe({
      next: (response) => {
        // @ts-ignore
        this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
}
