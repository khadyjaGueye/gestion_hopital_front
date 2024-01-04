import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../services/auth/service-auth.service';
import { Router } from '@angular/router';
import { Data, Model, User } from '../interface/model';
import { MedecinService } from '../services/medecin/medecin.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {

  medecins: User[] = [];

  userId!: number;
  nom!: string;
  prenom!: string;

  constructor(private serviceAuth: ServiceAuthService, private medecinService: MedecinService, private router: Router) { }

  ngOnInit(): void {
    // Récupérer l'utilisateur JSON
    const userJson = localStorage.getItem('user');
    if (userJson != null) {
      // Parse seulement si non null
      const user = JSON.parse(userJson);
      this.userId = user.id;
      this.nom = user.nom
      this.prenom = user.prenom
    } else {
      // Gérer le cas où pas d'utilisateur authentifié
    }

    this.index();
  }

  logout(id: number) {
    this.serviceAuth.logout(id).subscribe(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user")
      this.router.navigate(['/login']);
    })
  }

  index() {
    this.medecinService.url = environment.apiBaseUrl + '/medecin/liste/patients'
    //console.log(this.medecinService.url);
    return this.medecinService.all().subscribe((response: Model<Data>) => {
      this.medecins = response.data.medecins;
      console.log(response);
    })
  }
}
