import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../interface/model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceService {

  public userUpdated: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  updateUser(user: User) {
    this.userUpdated.emit(user);
  }
}
