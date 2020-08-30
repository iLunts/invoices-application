import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-list-modal',
  templateUrl: './service-list-modal.component.html',
  styleUrls: ['./service-list-modal.component.less'],
})
export class ServiceListModalComponent implements OnInit {
  serviceList: Service[] = [];
  selectedService: Service;

  constructor(
    private _modal: ModalController,
    private _service: ServicesService
  ) {
    this.fetch();
  }

  ngOnInit() {}

  fetch() {
    this._service
      .getAll()
      .valueChanges()
      .subscribe((response: Service[]) => {
        if (response) {
          this.serviceList = response;
        }
      });
  }

  close() {
    this._modal.dismiss({
      dismissed: true,
      selectedService: this.selectedService,
    });
  }

  select(data) {
    this.selectedService = data;
    this.close();
  }
}