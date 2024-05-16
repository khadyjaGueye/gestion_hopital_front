import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { ServiceAuthService } from '../services/auth/service-auth.service';
import { Router } from '@angular/router';
import { Data, DossierMedicale, Model, Ordonnance, Patient, Patient2, } from '../interface/model';
import { MedecinService } from '../services/medecin/medecin.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'jquery';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {

  @ViewChild('input') input!: ElementRef;

  patients: Patient[] = [];
  patient?: Patient2;

  nbRendezVous!: number;
  userId!: number;
  nom!: string;
  prenom!: string;
  email!: string;
  specialite!: string;
  information: boolean = false;
  message: string = "";
  display: string = "dossierMedical";
  isDossierSelected = false;

  constructor(private serviceAuth: ServiceAuthService, private medecinService: MedecinService, private router: Router) { }

  ngOnInit(): void {
    // Récupérer l'utilisateur JSON
    const userJson = localStorage.getItem('user');
    if (userJson != null) {
      // Parse seulement si non null
      const user = JSON.parse(userJson);
      this.userId = user.id;
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.email = user.email;
      this.specialite = user.specialite;
      this
    } else {
      // Gérer le cas où pas d'utilisateur authentifié
    }

    this.index();
    this.nbrePatientParJour()
  }
  toggleUserMenu() {
    this.information = !this.information;
  }

  logout(id: number) {
    this.serviceAuth.logout(id).subscribe(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user")
      this.router.navigate(['/login']);
    })
  }
  handleResponse<T>(responseOrError: T | HttpErrorResponse) {
    if (responseOrError instanceof HttpErrorResponse) {
      this.message = responseOrError.error.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.message,
        timer: 1500
      });
    } else {
      const response = responseOrError as Model<Data>;
      this.message = response.data.message;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: this.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  index() {
    this.medecinService.url = environment.apiBaseUrl + '/medecin/liste/patients';
    return this.medecinService.all().subscribe((response: Model<Data>) => {
      this.patients = response.data.patients
      //console.log(response);
    })
  }

  update(dossier: DossierMedicale) {
    this.medecinService.url = environment.apiBaseUrl + '/medecin/update/dossier';
    const id = dossier.id;
    return this.medecinService.update(dossier, id).subscribe((resp: Model<Data>) => {
      this.message = resp.data.message;
      this.handleResponse(resp);
    }, error => {
      this.handleResponse(error);
    })
  }

  createDossierMedical(dossier: DossierMedicale) {
    this.medecinService.url = environment.apiBaseUrl + '/medecin/create/dossier';
    return this.medecinService.store(dossier).subscribe((resp: Model<Data>) => {
      this.message = resp.data.message;
      this.handleResponse(resp);
    }, error => {
      this.handleResponse(error);
    })
  }

  createOrdonnance(ordonnance: Ordonnance) {
    this.medecinService.url = environment.apiBaseUrl + '/medecin/create/ordonnance';
    return this.medecinService.store(ordonnance).subscribe((resp: Model<Data>) => {
      this.message = resp.data.message;
      this.handleResponse(resp);
    }, error => {
      this.handleResponse(error);
    })
  }

  rechercherNumereDossier(searchTerm: string) {
    this.medecinService.url = environment.apiBaseUrl + '/medecin/show/dossier';
    return this.medecinService.show(searchTerm).subscribe((resp: Model<Data>) => {
      // console.log(resp);
      this.patient = resp.data.patient2
      // console.log(this.patient);
    })
  }
  nbrePatientParJour() {
    this.medecinService.url = environment.apiBaseUrl + '/medecin/nombre/patient';
    return this.medecinService.all().subscribe((resp: Model<Data>) => {
      // console.log(resp);
      this.nbRendezVous = resp.data.nbRendezVous;
    })
  }

  getDossier() {
    this.display = "dossierMedical"
    this.isDossierSelected = true;
  }

  getOrdonnance() {
    this.display = "ordonnance"
    this.isDossierSelected = true;
  }

  getCalendrier() {
    this.display = "calendrier";
    this.isDossierSelected = true;
  }
}
