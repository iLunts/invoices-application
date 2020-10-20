import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
})
export class SettingsBaseComponent implements OnInit {
  userSubscription: Subscription;
  userData: User;

  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userSubscription = this._auth
      .getUserStateChange()
      .subscribe((data: any) => {
        if (data) {
          this.userData = data;
        }
      });
  }
}
