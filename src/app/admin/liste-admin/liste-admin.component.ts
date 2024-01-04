import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interface/model';

@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.css']
})
export class ListeAdminComponent implements OnInit {

  @Input() users: User[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
