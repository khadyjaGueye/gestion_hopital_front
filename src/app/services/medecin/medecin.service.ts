import { Injectable } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import { Data } from 'src/app/interface/model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MedecinService extends RestServiceService<Data>{

  override url = environment.apiBaseUrl ;
  // override url:environment;

  constructor(http: HttpClient) {
    super(http);
  }
}
