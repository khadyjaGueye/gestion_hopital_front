import { Injectable } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import { Data } from 'src/app/interface/model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends RestServiceService<Data>{

  override url = environment.apiBaseUrl;

  constructor(http: HttpClient) {
    super(http);
  }

}
