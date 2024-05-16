import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Service, Style } from 'src/app/interface/model';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  @Input() services: Service[] = [];
  @Output() ajoutService = new EventEmitter<Service>();
  @Output() updateServic = new EventEmitter<Service>();

  @ViewChild('update') btn!: ElementRef
  @ViewChild('search') search!: ElementRef
  @ViewChild('edit')   edit!:ElementRef

  openModal: boolean = false;
  isEditMode = false;
  none: boolean = true;
  button: boolean = false;
  twoShot: boolean = false;

  formService: FormGroup;

  constructor(public fb: FormBuilder) {
    this.formService = fb.group({
      id: [''],
      libelle: [''],
    })
  }

  ngOnInit(): void {

  }

  closemodale() {
    this.openModal = false
  }
  updateService(service: Service) {
    console.log(service);
    this.formService.setValue({
      id: service.id,
      libelle: service.libelle
    })
  }

  createService() {
    const service = this.formService.value;
    this.ajoutService.emit(service);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    //console.log(this.btn.nativeElement.innerText);
    if (this.btn.nativeElement.innerText === 'Ajout') {
      this.search.nativeElement.disabled = true

    } else {
      this.search.nativeElement.disabled = false
    }
  }

  getStyle(index: number): Style {
    let style: Style = {};
    if ((index + 1) % 4 === 0) {
      style.marginLeft = 'auto';
    }
    return {
      flex: '0 0 25%',
      maxWidth: '25%',
      ...style
    }
  }
}
