import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ServiceListComponent implements OnInit {
  serviceList: Service[] = [];
  isLoaded: boolean;

  constructor(private _service: ServicesService) {
    this.fetch();
  }

  ngOnInit() {}

  fetch() {
    this.isLoaded = false;
    this._service
      .getAll()
      .valueChanges()
      .subscribe((data: Service[]) => {
        this.serviceList = data;
        this.isLoaded = true;
      });
  }

  delete(_id: string) {
    this._service.delete(_id).catch((error) => {
      // this._notifcation.error(error);
    });
  }
}
