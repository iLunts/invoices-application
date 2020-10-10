import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-service-tab-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.less'],
})
export class ServiceTabServiceComponent implements OnInit {
  serviceList: Service[] = [];
  isLoaded: boolean;

  constructor(
    private _service: ServicesService,
    private _router: Router,
    private _notification: NotificationService,
    private _actionSheet: ActionSheetController
  ) {
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

  async showMore(id) {
    const actionSheet = await this._actionSheet.create({
      header: 'Выберите действие',
      cssClass: 'invoice-action-sheet',
      buttons: [
        {
          text: 'Удалить',
          role: 'destructive',
          // icon: 'trash',
          handler: () => {
            this.delete(id);
          },
        },
        {
          text: 'Отменить',
          // icon: 'close',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  delete(_id: string) {
    this._service
      .delete(_id)
      .then((data) => {
        this._notification.success();
      })
      .catch((error) => {
        this._notification.error();
      });
  }

  createNew() {
    this._router.navigate(['service/create'], { replaceUrl: true });
  }
}
