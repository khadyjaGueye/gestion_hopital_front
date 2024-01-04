import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserAuth } from 'src/app/interface/model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {
  authenticatedUser: User | undefined;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<UserAuth> {
    const url = `${environment.apiBaseUrl}/login`;
    return this.http.post<UserAuth>(url, user);
  }

  logout(id: number) {
    const url = `${environment.apiBaseUrl}/logout/${id}`;
    return this.http.get(url);
  }

  public authentificateUser(user: User, token: string): Observable<boolean> {
    this.authenticatedUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token)
    return of(true);
  }
}
