import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ContractListComponent implements OnInit {
  isLoaded: boolean;
  listData: any[] = [];

  constructor() {}

  ngOnInit() {}
}
