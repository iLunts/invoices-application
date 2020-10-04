import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignaturePadComponent } from '../signature-pad/signature-pad.component';

@Component({
  selector: 'app-signature-panel',
  templateUrl: './signature-panel.component.html',
  styleUrls: ['./signature-panel.component.less'],
})
export class SignaturePanelComponent implements OnInit {
  constructor(public _modal: ModalController) {}

  ngOnInit() {}

  async open() {
    const modal = await this._modal.create({
      component: SignaturePadComponent,
      cssClass: 'signature-modal',
    });
    return await modal.present();
  }
}
