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
  groupServiceList: any[] = [];
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
          this.groupingList();
        }
      });
  }

  groupingList() {
    var groups = this.serviceList.reduce(function (obj, item) {
      obj[item.groupName] = obj[item.groupName] || [];
      obj[item.groupName].push(item);
      return obj;
    }, {});
    this.groupServiceList = Object.keys(groups).map(function (key) {
      return { group: key, data: groups[key] };
    });
  }

  getGroupName(name: any, index: number) {
    return Object.keys(name)[index];
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
