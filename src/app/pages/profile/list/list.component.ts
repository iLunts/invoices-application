import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-profile-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ProfileListComponent implements OnInit {
  profileList: Profile[] = [];

  constructor(private _router: Router, private _profile: ProfileService) {
    this.fetch();
  }

  ngOnInit() {}

  fetch() {
    this._profile.getAll().valueChanges().subscribe((response: any) => {
      if (response) {
        this.profileList = response;
      }
    });
  }

  createNew() {
    this._router.navigate(['/profile/create'], { replaceUrl: true });
  }
}
