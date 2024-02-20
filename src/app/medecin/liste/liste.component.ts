import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DossierMedicale, Patient, Patient2 } from 'src/app/interface/model';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  @Input() patients: Patient[] = [];
  @Input() patient?: Patient2;
  @Input() nbRendezVous!: number
  @Output() enregistrementDossier = new EventEmitter<DossierMedicale>();
  @Output() search = new EventEmitter<string>();
  @Output() updateDossier = new EventEmitter<DossierMedicale>();

  @ViewChild('input') input!: ElementRef;

  selectedPatient!: Patient;
  p: number = 1;
  openModal: boolean = false;
  formDossier: FormGroup;
  formDossierModifier: FormGroup;
  searchTerm!: string;
  dateValue?: string;
  dateEntreeValue?: string;
  dateSortieValue?: string;

  constructor(private fb: FormBuilder) {
    this.formDossier = fb.group({
      symptomes: ['', [Validators.required]],
      maladie_antecedent: ['', [Validators.required]],
      bilan: ['', [Validators.required]],
      dateEntre: ['', [Validators.required, this.validateDate]],
      dateSortie: ['', [Validators.required,this.validateDate]],
      numero: ['', [Validators.required]]
    });
    this.formDossierModifier = fb.group({
      id: [''],
      symptomes: ['', [Validators.required]],
      maladie_antecedent: ['', [Validators.required]],
      bilan: ['', [Validators.required]],
      dateEntre: ['', [Validators.required]],
      dateSortie: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  closemodale() {
    //fermer modal
    this.openModal = false
  }
  modalDossierMedical() {
    this.openModal = true;
    console.log('rrrr');

  }
  ajoutDossierMedical() {
    const dossier = this.formDossier.value;
    this.enregistrementDossier.emit(dossier);
    console.log(dossier);
    this.openModal = false;
  }

  modalupdate(dossier: DossierMedicale) {
    this.openModal = true;
    console.log(dossier);
    this.formDossierModifier.setValue({
      id: dossier.id,
      symptomes: dossier.symptomes,
      maladie_antecedent: dossier.maladie_antecedent,
      bilan: dossier.bilan,
      dateEntre: dossier.dateEntre,
      dateSortie: dossier.dateSortie,
    });
  }

  enregistrementUpdate() {
    this.openModal = false;
    console.log(this.formDossierModifier.value);
    this.updateDossier.emit(this.formDossierModifier.value);
  }

  onSubmit() {
    // Récupérer la valeur de l'input
    this.searchTerm = this.input.nativeElement.value;
    //this.selectedPatient = this.searchTerm
    //console.log(this.searchTerm);
    this.search.emit(this.searchTerm);
    //Vider le champ de recherche
    this.input.nativeElement.value = '';
  }

  //Conversion du date
  formatDate(date: string) {
    return new Date(date).toISOString().slice(0, 10);
  }

  formatedDateEntree() {
    let date = this.formDossier.get('dateEntree')?.value;
    this.dateEntreeValue = this.formatDate(date);
  }

  formatedDateSortie() {
    let date = this.formDossier.get('dateSortie')?.value;
    this.dateSortieValue = this.formatDate(date);
  }

  //Verification de l'année actuelle
  validateDate(control: AbstractControl): { [key: string]: string } | null {
    const valueDate = control.value;
    let dateC = valueDate.split("-");
    const date = new Date();
    const currentYear = date.getFullYear();
    if (dateC[0] != currentYear) {
      return { "message": "l'année doit correspondre à l'année actuelle" };
    }
    return null
  }



}
