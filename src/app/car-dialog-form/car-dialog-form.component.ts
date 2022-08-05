import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilFunctionsService} from "../services/utils/util-functions.service";
import {CarDataService} from "../services/api/car-data.service";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-car-dialog-form',
  templateUrl: './car-dialog-form.component.html',
  styleUrls: ['./car-dialog-form.component.css']
})
export class CarDialogFormComponent implements OnInit {
  carForm!: FormGroup;
  carActionButton: string = "Enregistrer";

  constructor(private formBuilder: FormBuilder, private carDataService: CarDataService,
              private dialogRef : MatDialogRef<CarDialogFormComponent>, private utilFunc : UtilFunctionsService,
              @Inject(MAT_DIALOG_DATA) public editCarData : any) {
  }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      immatriculation: ['', Validators.required],
      marque: ['', Validators.required],
      modele : ['', Validators.required],
      couleur: ['', Validators.required],
    });

    if(this.editCarData) {
      this.carActionButton = "Modifier";
      this.carForm.controls['immatriculation'].setValue(this.editCarData.immatriculation);
      this.carForm.controls['marque'].setValue(this.editCarData.marque);
      this.carForm.controls['modele'].setValue(this.editCarData.modele);
      this.carForm.controls['couleur'].setValue(this.editCarData.couleur);
    }

    // this.matcher = new MyErrorStateMatcher();
  }

  addCar() {
    if (!this.editCarData) {
      if(this.carForm.valid){
        console.log(this.carForm.value)
        this.carDataService.postCar(this.carForm.value).subscribe({
          next: (response) => {
            alert("L'opération d'ajout du véhicule s'est déroulée avec succès :+1:");
            this.carForm.reset();
            this.dialogRef.close('saved');
          },
          error: (error) => {
            alert("Error while adding a véhicule " + error.toString());
          }
        })
      } else {
        alert("Le formulaire n'est pas bien rempli");
      }
    } else {
      this.updateCar();
    }
  }

  private updateCar() {
    console.log(this.carForm.value);
    if(this.carForm.valid) {
      this.carDataService.updateCar(this.carForm.value, this.editCarData.id).subscribe({
        next: (response) => {
          alert("Mise à jour réussie");
          this.carForm.reset();
          this.dialogRef.close('updated');
        },
        error: (err) => {
          alert("Échec de mise à jour du véhicule");
        }
      })
    } else {
      alert("La mise à jour du véhicule a échoué");
    }

  }
}
