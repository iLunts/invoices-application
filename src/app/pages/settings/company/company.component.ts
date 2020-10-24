import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contractor } from 'src/app/models/contractor.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-settings-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
})
export class SettingsCompanyComponent implements OnInit {
  profileList: Contractor[] = [];

  constructor(private _profile: ProfileService, private _router: Router) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this._profile.getAll().subscribe((response: any) => {
      if (response) {
        this.profileList = response;
      }
    });
  }

  createNew() {
    this._router.navigate(['/settings/company/create'], { replaceUrl: true });
  }
}
