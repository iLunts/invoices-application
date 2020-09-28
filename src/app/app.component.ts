import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { Subscription } from 'rxjs';
import { InvoiceStatus } from './models/invoice.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Домашняя',
      url: '/home',
      icon: 'planet',
    },
    {
      title: 'Контрагенты',
      url: '/contractor',
      icon: 'people',
    },
    {
      title: 'Услуги',
      url: '/service',
      icon: 'file-tray-stacked',
    },
    {
      title: 'Профиль',
      url: '/profile',
      icon: 'business',
    },
  ];
  public docsPages = [
    {
      title: 'Договора',
      url: '/contract',
      icon: 'document-text',
    },
    {
      title: 'Счета',
      url: '/invoice',
      icon: 'receipt',
    },
  ];
  public appNonAuthPages = [
    {
      title: 'Login',
      url: '/auth/login',
      icon: 'enter',
    },
  ];
  public labels = ['Оплаченные', 'Отправленные'];
  userData: User;
  userSubscription: Subscription;
  invoiceStatusList: InvoiceStatus[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _auth: AuthService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.userSubscription = this._auth
        .getUserStateChange()
        .subscribe((data: any) => {
          if (data) {
            this.userData = data;
          }
        });

      // Check user first auth
      this._auth.CheckUser();
    });
  }

  ngOnInit() {}

  // fetchInvoiceStatuses() {
  //   this._invoce.getAllStatus().subscribe((response: InvoiceStatus[]) => {
  //     if (response) {
  //       this.invoiceStatusList = response;
  //     }
  //   });
  // }

  logout() {
    this._auth.SignOut();
    this.userData = null;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
