import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ClientsDialogFormComponent} from "./clients-dialog-form/clients-dialog-form.component";
import {CarDialogFormComponent} from "./car-dialog-form/car-dialog-form.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agence de Location de Voitures';
  selection: any;

  constructor(private dialog: MatDialog, private router: Router) {
  }

  openClientDialog() {
    const dialogRef = this.dialog.open(ClientsDialogFormComponent, {
      width: "30%"
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'saved') {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/clients']);
        });
      }
    });
  }

  openCarDialog() {
    const dialogRef = this.dialog.open(CarDialogFormComponent, {
      width: "30%"
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'saved') {
        // this.router.navigate(['/clients']);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cars']);
        });
      }
    });
  }
}

