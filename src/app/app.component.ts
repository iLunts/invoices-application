import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Contractors',
      url: '/contractor',
      icon: 'people',
    },
    {
      title: 'Invoices',
      url: '/invoice',
      icon: 'documents',
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings',
    },
    {
      title: 'Exit',
      url: '/auth/login',
      icon: 'exit',
    },
  ];
  public appNonAuthPages = [
    {
      title: 'Login',
      url: '/auth/login',
      icon: 'enter',
    },
  ];
  public labels = ['Payed', 'Sended'];
  userData: User;
  // userSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.userSubscription = this._auth
      //   .getUserStateChange()
      //   .subscribe((data: any) => {
      //     if (data) {
      //       this.userData = data;
      //     }
      //   });

      // this.userSubscription = this._auth
      //   .getUserStateChange()
      //   .subscribe((data: any) => {
      //     if (data) {
      //       this.userData = data;
      //     }
      //   });
    });
  }

  ngOnInit() {
    // this._auth.checkPreAuthorization();
    // this.userInformation = this._auth.getUser();
  }

  logout() {
    this._auth.SignOut();
  }

  ngOnDestroy(): void {
    // this.userSubscription.unsubscribe();
  }
}
