import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Ordonnance } from 'src/app/interface/model';



@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent implements OnInit {

  @Output() createOrdonnance = new EventEmitter<Ordonnance>

  formOrdonnance: FormGroup;
  ordonnances: Ordonnance[] = [];
  openModal: boolean = false;
  display: boolean = false
  medicaments = new FormArray([]);

  constructor(private fb: FormBuilder) {
    this.formOrdonnance = fb.group({
       nom: [''],
       prenom: [''],
       age: [''],
       numeroDossier: [''],
      medicament: [''],
    });
    this.formOrdonnance = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      age: new FormControl(''),
      medicament: new FormControl(''),
      numeroDossier:new FormControl(''),
    });
  }

  ngOnInit(): void {

  }

  // addMedicament() {
  //   this.medicaments.push(
  //     new FormGroup({
  //       medicamenr: new FormControl(''),
  //     })
  //   );
  // }
  closemodale() {
    //fermer modal
    this.openModal = false
  }

  ajoutOrdonnance() {
    this.createOrdonnance.emit(this.formOrdonnance.value);
    const ordonnance: Ordonnance = {
      id: this.formOrdonnance.value.id,
      numeroDossier: this.formOrdonnance.value.id,
      nom: this.formOrdonnance.value.nom,
      prenom: this.formOrdonnance.value.prenom,
      age: this.formOrdonnance.value.age,
      medicament: this.formOrdonnance.value.medicament
    }
    this.ordonnances.push(ordonnance);
    // vider les champs
    this.formOrdonnance.reset();
    this.openModal = true;
  }
  // print() {
  //   window.print();
  // }
}
