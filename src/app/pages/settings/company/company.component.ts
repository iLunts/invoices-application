import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
})
export class SettingsCompanyComponent implements OnInit {
  unpSearch: string;
  isLoadingSearchUnp: boolean;

  constructor() {}

  ngOnInit() {}

  save(): void {}

  searchByUNP(): void {}
}
