import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-notificator',
  templateUrl: './profile-notificator.component.html',
  styleUrls: ['./profile-notificator.component.less'],
})
export class ProfileNotificatorComponent implements OnInit {
  isActive: boolean;

  constructor(private _profile: ProfileService, private _router: Router) {
    this.isActive = this._profile.isActive;
  }

  ngOnInit() {}

  goToSettingsProfile(): void {
    this._router.navigate(['/settings/company'], { replaceUrl: true });
  }
}
