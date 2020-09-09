import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ProfileCreateComponent implements OnInit {
  profile: Profile = new Profile();

  constructor(private _profile: ProfileService, private _router: Router) {}

  ngOnInit() {}

  save() {
    this._profile.add(this.profile).subscribe((response: any) => {
      this._router.navigate(['/profile'], { replaceUrl: true });
    });
  }
}
