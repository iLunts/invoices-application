import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ContractListComponent implements OnInit {
  isLoaded: boolean;
  listData: any[] = [];

  constructor(private _contract: ContractService, private _router: Router) {
    this.fetch();
  }

  ngOnInit() {}

  fetch() {
    this.isLoaded = false;
    this._contract
      .getAll()
      .valueChanges()
      .subscribe((response: any) => {
        this.listData = response;
        this.isLoaded = true;
      });
  }

  createNew() {
    this._router.navigate(['contract/create'], { replaceUrl: true });
  }
}
