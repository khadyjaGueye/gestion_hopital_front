import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin/admin.service';
import { Data, Model, User } from '../interface/model';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { ServiceAuthService } from '../services/auth/service-auth.service';
import Swal from 'sweetalert2';

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
  email!:string;
  message: string = "";
  display:string = "service";
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
  }

  toggleUserMenu() {
    this.information = !this.information;
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
  edite(user: User) {
    this.adminService.url = environment.apiBaseUrl + '/admin/update/user';
    const id = user.id;
    return this.adminService.update(user, id).subscribe((resp: Model<Data>) => {
      this.message = resp.data.message;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: this.message,
        showConfirmButton: false,
        timer: 1500
      });

    }, error => {
      this.message = error.error.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.message,
        timer: 1500
      })
    })
  }
  destroy(id: number) {
    this.adminService.url = environment.apiBaseUrl + '/admin/delete/user';
    return this.adminService.delete(id).subscribe((resp: Model<Data>) => {
      this.message = resp.data.message;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: this.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      this.message = error.error.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.message,
        timer: 1500
      })
    })
  }
  createUser(user: User) {
    this.adminService.url = environment.apiBaseUrl + '/admin/create/user';
    return this.adminService.store(user).subscribe((resp: Model<Data>) => {

      this.message = resp.data.message;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: this.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      this.message = error.error.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.message,
        timer: 1500
      })
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

  getUser(){
    this.display = "user";
  }

  getService(){
    this.display = "service";
  }
}
