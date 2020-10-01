import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Contractor } from 'src/app/models/contractor.model';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ContractorListModalComponent } from '../../modals/contractor-list-modal/contractor-list-modal.component';
import { ContractorService } from 'src/app/services/contractor.service';
import { Router } from '@angular/router';

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
    private _router: Router
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
    this._contractor.delete(this.selectedContractor._id).then();
  }

  async showMore() {
    const actionSheet = await this._actionSheet.create({
      header: 'Выберите действие',
      buttons: this.generateActionButtons(),
    });

    await actionSheet.present();
  }

  generateActionButtons() {
    let buttons: any[] = [
      {
        text: 'Информация',
        handler: () => {
          this._router.navigate(['/contractor', this.selectedContractor._id], {
            replaceUrl: true,
          });
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

    // if (this.selectedContractor.contractId) {
    //   buttons.unshift({
    //     text: 'Скачать договор PDF',
    //     role: 'download',
    //     handler: () => {
    //       this._templatePdf.downloadPdf('contract');
    //     },
    //   });
    // } else {
    //   buttons.unshift({
    //     text: 'Создать договор',
    //     role: 'download',
    //     handler: () => {
    //       this._router.navigate(['/contract/create'], {
    //         queryParams: {
    //           invoiceId: this.selectedInvoice._id,
    //           contractorId: this.selectedInvoice.contractor._id,
    //         },
    //         replaceUrl: true,
    //       });
    //     },
    //   });
    // }

    return buttons;
  }
}
