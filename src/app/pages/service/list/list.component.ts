import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ServiceListComponent implements OnInit {
  activeTab = 'service';

  constructor() {}

  ngOnInit() {}

  selectTab(value) {
    this.activeTab = value;
  }
}
