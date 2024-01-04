import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin/admin.service';
import { Data, Model, User } from '../interface/model';
import { environment } from 'src/environments/environment.development';
import { Route } from '@angular/router';
import { ServiceAuthService } from '../services/auth/service-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  userId!: number;
  nom!: string;
  prenom!: string;
  role!: string;

  constructor(private serviceAuth: ServiceAuthService, private adminService: AdminService,) { }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson != null) {
      const user = JSON.parse(userJson);
      this.userId = user.id;
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.role = user.role;
    }
    this.index();
  }
  index() {
    this.adminService.url = environment.apiBaseUrl + '/admin/liste/users';
    //console.log(this.adminService.url);
    return this.adminService.all().subscribe((resp: Model<Data>) => {
      console.log(resp);
      this.users = resp.data.users;
    });
  }
}
