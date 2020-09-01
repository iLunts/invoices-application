import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ProfileListComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {}

  ngOnInit() {}

  createNew() {
    this._router.navigate(['/profile/create']);
  }
}
