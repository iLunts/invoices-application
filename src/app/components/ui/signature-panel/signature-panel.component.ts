import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignaturePadComponent } from '../signature-pad/signature-pad.component';
@Component({
  selector: 'app-signature-panel',
  templateUrl: './signature-panel.component.html',
  styleUrls: ['./signature-panel.component.less'],
})
export class SignaturePanelComponent implements OnInit {
  @Output() result = new EventEmitter<string>();
  signaturePad: string;

  constructor(
    public _modal: ModalController,
  ) {}

  ngOnInit() {}

  async open() {
    const modal = await this._modal.create({
      component: SignaturePadComponent,
      cssClass: 'signature-modal',
    });
    await modal.present();

    // Get returned data
    await modal.onWillDismiss().then((data: any) => {
      if (data.data.signature) {
        this.signaturePad = data.data.signature;
        this.result.emit(this.signaturePad);
      }
    });
  }

  edit() {
    this.open();
  }
}
