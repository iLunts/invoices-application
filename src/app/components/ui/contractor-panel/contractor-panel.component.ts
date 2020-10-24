import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Contractor } from 'src/app/models/contractor.model';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ContractorListModalComponent } from '../../modals/contractor-list-modal/contractor-list-modal.component';
import { ContractorService } from 'src/app/services/contractor.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-contractor-panel',
  templateUrl: './contractor-panel.component.html',
  styleUrls: ['./contractor-panel.component.less'],
})
export class ContractorPanelComponent implements OnInit {
  @Input() isViewMode = false;
  @Input() isSelectMode = false;
  @Input() isShowMore = false;
  @Input() isExist = false;
  @Input() path = 'contractor';
  @Input() set setContractor(value) {
    if (value && value.info.unp) {
      this.selectedContractor = value;
    } else {
      this.selectedContractor = null;
    }
  }
  @Output() contractor = new EventEmitter<Contractor>();
  @Output() select = new EventEmitter<Contractor>();
  selectedContractor: Contractor;

  constructor(
    private _modal: ModalController,
    private _actionSheet: ActionSheetController,
    private _contractor: ContractorService,
    private _profile: ProfileService,
    private _router: Router,
    private _notification: NotificationService
  ) {}

  ngOnInit() {}

  async showContractorModal() {
    const modal = await this._modal.create({
      component: ContractorListModalComponent,
      cssClass: 'modal-contractor',
    });

    modal.onDidDismiss().then((data) => {
      console.log(data.data);
      if (data.data.selectedContractor) {
        this.selectedContractor = data.data.selectedContractor;
        this.contractor.emit(this.selectedContractor);
      }
    });

    return await modal.present();
  }

  selectContractor() {
    this.select.emit(this.selectedContractor);
  }

  delete() {
    if (!this.selectedContractor) {
      return;
    }
    switch (this.path) {
      case 'contractor': {
        this._contractor.delete(this.selectedContractor._id).then();
        break;
      }
      case 'profile': {
        this._profile.delete(this.selectedContractor._id).then();
        break;
      }
      default: {
        this._notification.error(
          'Не верный тип пути для удаления: ' + this.path
        );
        break;
      }
    }
  }

  async showMore() {
    const actionSheet = await this._actionSheet.create({
      header: 'Выберите действие',
      cssClass: 'invoice-action-sheet',
      buttons: this.generateActionButtons(),
    });

    await actionSheet.present();
  }

  generateActionButtons() {
    let buttons: any[] = [];

    switch (this.path) {
      case 'contractor': {
        buttons = [
          {
            text: 'Информация',
            handler: () => {
              this._router.navigate(
                ['/contractor', this.selectedContractor._id],
                {
                  replaceUrl: true,
                }
              );
            },
          },
          {
            text: 'Документы',
            handler: () => {
              this._contractor.setContractor(this.selectedContractor);
              this._router.navigate(
                ['/contractor', this.selectedContractor._id, 'documents'],
                {
                  replaceUrl: true,
                }
              );
            },
          },
          {
            text: 'Удалить',
            role: 'destructive',
            handler: () => {
              this.delete();
            },
          },
          {
            text: 'Отменить',
            role: 'cancel',
            handler: () => {},
          },
        ];
        break;
      }
      case 'profile': {
        buttons = [
          {
            text: 'Удалить',
            role: 'destructive',
            handler: () => {
              this.delete();
            },
          },
          {
            text: 'Отменить',
            role: 'cancel',
            handler: () => {},
          },
        ];
        break;
      }
    }

    return buttons;
  }
}
