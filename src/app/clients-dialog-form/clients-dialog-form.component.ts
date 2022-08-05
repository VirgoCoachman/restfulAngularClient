import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validator, Validators} from "@angular/forms";
import { ErrorStateMatcher} from "@angular/material/core";
import {ClientDataService} from "../services/api/client-data.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilFunctionsService} from "../services/utils/util-functions.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-clients-dialog-form',
  templateUrl: './clients-dialog-form.component.html',
  styleUrls: ['./clients-dialog-form.component.css']
})
export class ClientsDialogFormComponent implements OnInit {
  matcher!: MyErrorStateMatcher;
  clientForm !: FormGroup;
  clientActionButton: string = "Enregistrer";

  constructor(private formBuilder: FormBuilder, private userDataService: ClientDataService,
              private dialogRef : MatDialogRef<ClientsDialogFormComponent>, private utilFunc : UtilFunctionsService,
              @Inject(MAT_DIALOG_DATA) public editClientData : any) {
  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      date_naissance : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required]
    });

    if(this.editClientData) {
      this.clientActionButton = "Modifier";
      this.clientForm.controls['nom'].setValue(this.editClientData.nom);
      this.clientForm.controls['prenom'].setValue(this.editClientData.prenom);
      this.clientForm.controls['date_naissance']
        .setValue(this.utilFunc.getDateFromDateTime(this.editClientData.date_naissance));
      this.clientForm.controls['email'].setValue(this.editClientData.email);
      this.clientForm.controls['telephone'].setValue(this.editClientData.telephone);
      this.clientForm.controls['adresse'].setValue(this.editClientData.adresse);
    }

    // this.matcher = new MyErrorStateMatcher();
  }

  addClient() {
    if (!this.editClientData) {
      this.postClient();
    } else {
      this.updateClient();
    }
  }

  public updateClient() {
    if(this.clientForm.valid) {
      this.userDataService.updateClient(this.clientForm.value, this.editClientData.id).subscribe({
        next: (response) => {
          alert("Mise à jour réussie");
          this.clientForm.reset();
          this.dialogRef.close('updated');
        },
        error: (err) => {
          alert("Échec de mise à jour du client");
        }
      })
    } else {
      alert("La mise à jour du client a échoué");
    }

  }

  public postClient() {
    if(this.clientForm.valid){
      this.userDataService.postClient(this.clientForm.value).subscribe({
        next: (response) => {
          alert("L'opération d'ajout du client s'est déroulée avec succès :+1:");
          this.clientForm.reset();
          this.dialogRef.close('saved');
        },
        error: (error) => {
          alert("Error while adding a client " + error.toString());
        }
      })
    } else {
      alert("Le formulaire n'est pas bien rempli");
    }
  }
}
