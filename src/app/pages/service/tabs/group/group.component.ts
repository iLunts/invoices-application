import { Component, OnInit } from '@angular/core';
import { Service, ServiceGroup } from 'src/app/models/service.model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionSheetController } from '@ionic/angular';
import { ServicesGroupService } from 'src/app/services/servicesGroup.service';

@Component({
  selector: 'app-service-tab-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.less'],
})
export class ServiceTabGroupComponent implements OnInit {
  groupList: ServiceGroup[] = [];
  isLoaded: boolean;

  constructor(
    private _servicesGroup: ServicesGroupService,
    private _router: Router,
    private _notification: NotificationService,
    private _actionSheet: ActionSheetController
  ) {
    this.fetch();
  }

  ngOnInit() {}

  fetch() {
    this.isLoaded = false;
    this._servicesGroup
      .getAll()
      .valueChanges()
      .subscribe((data: Service[]) => {
        this.groupList = data;
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
    this._servicesGroup
      .delete(_id)
      .then((data) => {
        this._notification.success();
      })
      .catch((error) => {
        this._notification.error();
      });
  }

  createNew() {
    this._router.navigate(['service/group/create'], { replaceUrl: true });
  }
}
