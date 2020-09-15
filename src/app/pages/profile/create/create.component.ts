import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';
import { Router } from '@angular/router';
import { EgrService } from 'src/app/services/egr.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Bank } from 'src/app/models/bank.model';

@Component({
  selector: 'app-profile-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ProfileCreateComponent implements OnInit {
  unpSearch: string;
  data: any;
  profile: Profile = new Profile();
  // isExistProfile: any;
  isCollapse: boolean;
  isLoadingSearchUnp: boolean;

  constructor(
    private _profile: ProfileService,
    private _egr: EgrService,
    private _router: Router,
    private _notification: NotificationService
  ) {}

  ngOnInit() {}

  searchByUNP() {
    this.isLoadingSearchUnp = true;
    this.profile = this._egr.getContractorByUnp(this.unpSearch);
    this.isLoadingSearchUnp = false;
  }

  save() {
    this._profile.add(this.profile).subscribe((response: any) => {
      this._notification.success('Профиль успешно создан');
      this._router.navigate(['/profile'], { replaceUrl: true });
    });
  }

  collapse(event: boolean) {
    this.isCollapse = event;
  }

  selectBank(data: Bank) {
    this.profile.bankAccount.bank = data;
  }
}
