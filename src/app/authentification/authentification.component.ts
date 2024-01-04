import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceAuthService } from '../services/auth/service-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  authenticate: FormGroup;

  message: string = "";
  constructor(private fb: FormBuilder, private serviceAuth: ServiceAuthService, private router: Router) {
    this.authenticate = this.fb.group({
      email: ['',],
      password: ['',],
    })
  }
  ngOnInit(): void {

  }
  connecter() {
    //console.log(this.authenticate.get('email')?.value);
    let userLog = this.authenticate.value;
    return this.serviceAuth.login(userLog).subscribe(response => {
      if (response.status) {
        let token = response.token;
        let user = response.user;

        this.serviceAuth.authentificateUser(user, token).subscribe(resp => {
          if (user.role == "medecin") {
            this.router.navigateByUrl("/medecin");
          } if (user.role == "admin") {
            this.router.navigateByUrl("/admin");
          }
        })

      } else {
        this.router.navigateByUrl("");
      }
    }, error => {
      console.error(error.error.message);
      this.message = error.error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.message,
      })
    })
  }
}
