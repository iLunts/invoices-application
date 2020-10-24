import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bank } from 'src/app/models/bank.model';
import { Contractor } from 'src/app/models/contractor.model';
import { EgrService } from 'src/app/services/egr.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-settings-company-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class SettingsCompanyCreateComponent implements OnInit {
  unpSearch: string;
  isLoadingSearchUnp: boolean;
  profile: Contractor = new Contractor();

  constructor(
    private _egr: EgrService,
    private _profile: ProfileService,
    private _router: Router,
    private _notification: NotificationService
  ) {}

  ngOnInit() {}

  searchByUNP(): void {
    this.isLoadingSearchUnp = true;
    this.profile = this._egr.getContractorByUnp(this.unpSearch);
    this.isLoadingSearchUnp = false;
  }

  selectBank(data: Bank) {
    this.profile.bankAccount.bank = data;
  }

  save(): void {
    this._profile.add(this.profile).subscribe((response: any) => {
      this._notification.success('Компания профиля успешно создана');
      this._router.navigate(['/settings'], { replaceUrl: true });
    });
  }
}
