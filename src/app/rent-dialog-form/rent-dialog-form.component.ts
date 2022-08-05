import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ClientDataService} from "../services/api/client-data.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RentDataService} from "../services/api/rent-data.service";
import {UtilFunctionsService} from "../services/utils/util-functions.service";
import {IRent} from "../rents/rents.component";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-rent-dialog-form',
  templateUrl: './rent-dialog-form.component.html',
  styleUrls: ['./rent-dialog-form.component.css']
})
export class RentDialogFormComponent implements OnInit {
  rentForm!: FormGroup;
  description: any;
  clients!: any[];

  constructor(private formBuilder: FormBuilder, private clientDataService: ClientDataService,
              private dialogRef : MatDialogRef<RentDialogFormComponent>,
              private rentDataService: RentDataService, private utilFunc : UtilFunctionsService,
              @Inject(MAT_DIALOG_DATA) public editCarData : any) { }

  ngOnInit(): void {
    this.rentForm = this.formBuilder.group({
      date_location: ['', Validators.required],
      id_voiture: ['', Validators.required],
      id_client: ['', Validators.required],
    });

    if(this.editCarData) {
      this.clients = [];
      console.log(this.rentForm.value);
      this.rentForm.controls['id_voiture'].setValue(this.editCarData.id);
      this.rentForm.controls['date_location'].setValue(this.utilFunc.getDateFromDateTime(new Date()));
      this.description = this.editCarData.marque + " " + this.editCarData.modele + " " + this.editCarData.immatriculation;

      this.clientDataService.getAllClients().subscribe({
        next: (res)=>{
          let data = JSON.parse(JSON.stringify(res));
          data.forEach((elt: any)=>{
            this.clients.push(elt);
          })
        }
      });
    }

  }

  addRent() {
    if(this.rentForm.valid){
      console.log(this.rentForm.value);
      this.rentDataService.postRent(this.rentForm.value).subscribe({
        next: (response) => {
          alert("La location a été faite avec succès!");
          this.rentForm.reset();
          this.dialogRef.close('saved');
        },
        error: (error) => {
          alert("Cette voiture est déjà en location! ");
        }
      })
    } else {
      alert("Le formulaire n'est pas bien rempli");
    }
  }
}
