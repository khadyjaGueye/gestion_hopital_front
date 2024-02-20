import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interface/model';
import { CommunicationServiceService } from 'src/app/services/communication-service.service';

@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.css']
})
export class ListeAdminComponent implements OnInit {

  @Input() users: User[] = [];
  @Input() idUser!: number;
  @Output() modificationEnregistre = new EventEmitter<User>();
  @Output() suppressionEnregistre = new EventEmitter<number>();
  @Output() ajouterUser = new EventEmitter<User>();

  p: number = 1;
  openModal: boolean = false;
  openModalSuppression: boolean = false
  openModalAjout: boolean = false;
  formUser: FormGroup;
  formUserAjout: FormGroup;
  searchForm: FormGroup;
  searchTerm: string = '';
  usersListe: User[] = [];
  roles: string[] = ['admin', 'medecin', 'receptionniste']
  specialites: string[] = ['Cardiologie', 'Pediatrie', 'Chirurgie']

  constructor(private fb: FormBuilder, private commService: CommunicationServiceService) {
    this.formUser = fb.group({
      id:[],
      nom: [],
      prenom: [],
      email: [],
      role: [],
      specialite: []
    });
    this.formUserAjout = fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      specialite: ['', Validators.required],
      telephone: ['', Validators.required],
    });
    this.searchForm = fb.group({
      search: [],
    });
  }

  ngOnInit(): void {
    this.commService.userUpdated.subscribe((updateUser: User) => {
      const index = this.users.findIndex(user => user.id === updateUser.id);
      if (index !== -1) {
        this.users[index] = updateUser;
      }
    })
  }
  closemodale() {
    //fermer modal
    this.openModal = false
    this.openModalSuppression = false;
    this.openModalAjout = false;
  }
  editUser(user: User) {
    //console.log(user);
    this.formUser.setValue({
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      specialite: user.specialite
    })
    this.openModal = true;
  }

  ouvrirModalAjout() {
    this.openModalAjout = true;

  }
  createUser() {
    const user = this.formUserAjout.value;
    this.ajouterUser.emit(user);
    this.openModalAjout = false;
    //console.log(user);
  }

  enregistreModification() {
    // console.log(this.formUser.value);
    this.modificationEnregistre.emit(this.formUser.value);
    this.commService.updateUser(this.formUser.value)
    this.openModal = false;
  }

  detele(userId: number) {
    //this.openModalSuppression = true;
    this.suppressionEnregistre.emit(userId);
  }

  annuler() {

  }

  recherche() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.usersListe = this.usersListe.filter(user =>
      user.prenom.toLowerCase().includes(searchTermLower) || user.nom.toLowerCase().includes(searchTermLower));
  }

}
