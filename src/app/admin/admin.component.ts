import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin/admin.service';
import { Data, Model, Service, User } from '../interface/model';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { ServiceAuthService } from '../services/auth/service-auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  services: Service[] = [];
  userId!: number;
  nom!: string;
  prenom!: string;
  role!: string;
  email!: string;
  message: string = "";
  display: string = "service";
  information: boolean = false;

  constructor(private serviceAuth: ServiceAuthService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson != null) {
      const user = JSON.parse(userJson);
      this.userId = user.id;
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.role = user.role;
      this.email = user.email
    }
    this.index();
    this.listeService();
  }

  toggleUserMenu() {
    this.information = !this.information;
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
    this.adminService.url = environment.apiBaseUrl + '/admin/liste/users';
    //console.log(this.adminService.url);
    return this.adminService.all().subscribe((resp: Model<Data>) => {
      //console.log(resp);
      this.users = resp.data.users;
      //console.log(resp.data.users);
    });
  }

  listeService() {
    this.adminService.url = environment.apiBaseUrl + '/admin/liste/service';
    return this.adminService.all().subscribe((resp: Model<Data>) => {
      this.services = resp.data.services;
    });
  }

  editerService(service: Service) {
    this.adminService.url = environment.apiBaseUrl + '/admin/update/service';
    const id = service.id;
    return this.adminService.update(service, id).subscribe((resp: Model<Data>) => {
      this.handleResponse(resp);

    }, error => {
      this.handleResponse(error);
    })
  }

  createService(service: Service) {
    this.adminService.url = environment.apiBaseUrl + '/admin/create/service';
    return this.adminService.store(service).subscribe((resp: Model<Data>) => {
      this.handleResponse(resp);
    }, (error) => {
      this.handleResponse(error);  // Pass the error to handleResponse
    });
  }

  edite(user: User) {
    this.adminService.url = environment.apiBaseUrl + '/admin/update/user';
    const id = user.id;
    return this.adminService.update(user, id).subscribe((resp: Model<Data>) => {
      this.handleResponse(resp);
    }, error => {
     this.handleResponse(error);
    })
  }

  destroy(id: number) {
    this.adminService.url = environment.apiBaseUrl + '/admin/delete/user';
    return this.adminService.delete(id).subscribe((resp: Model<Data>) => {
      this.handleResponse(resp)
    }, error => {
      this.handleResponse(error);
    })
  }

  createUser(user: User) {
    this.adminService.url = environment.apiBaseUrl + '/admin/create/user';
    return this.adminService.store(user).subscribe((resp: Model<Data>) => {
      this.handleResponse(resp)
    }, error => {
      this.handleResponse(error);
    })

  }

  show(id: string) {
    return this.adminService.show(id).subscribe((resp: Model<Data>) => {

    })
  }

  logout(id: number) {
    this.serviceAuth.logout(id).subscribe(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user")
      this.router.navigate(['/login']);
    })
  }

  getUser() {
    this.display = "user";
  }

  getService() {
    this.display = "service";
  }
}
