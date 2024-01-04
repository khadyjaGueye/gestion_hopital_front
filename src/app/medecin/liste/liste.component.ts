import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interface/model';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  @Input() patients: User[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
