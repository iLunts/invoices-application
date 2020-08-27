import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private loadingPopover: any;
  private toastPopover: any;

  constructor(
    private _loading: LoadingController,
    private _toast: ToastController
  ) {}

  async success(message?: string, duration?: number) {
    this.toastPopover = await this._toast.create({
      message: message || 'Успешно.',
      duration: duration || 3000,
      color: 'success',
    });
    this.toastPopover.present();
  }

  async error(message?: string, duration?: number) {
    this.toastPopover = await this._toast.create({
      message: message || 'Ошибка.',
      duration: duration || 3000,
      color: 'danger',
    });
    this.toastPopover.present();
  }

  async loading(message?: string, duration?: number, spinner?: any) {
    this.loadingPopover = await this._loading.create({
      message: message || 'Ожидийте...',
      duration: duration || 5000,
      spinner: spinner || 'bubbles',
    });
    await this.loadingPopover.present();
  }

  dismissLoading() {
    this._loading.dismiss();
  }
}
