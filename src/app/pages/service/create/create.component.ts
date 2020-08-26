import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { Unit } from 'src/app/models/unit.model';
import { PriceType } from 'src/app/models/price.model';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ServiceCreateComponent implements OnInit {
  unitList: Unit[] = [];
  priceList: PriceType[] = [];

  constructor(
    private _unit: UnitService,
    private _price: PriceService,
    ) {}

  ngOnInit() {
    this.fetchUnit();
    this.fetchPrice();
  }

  fetchUnit() {
    this._unit
      .getAll()
      .valueChanges()
      .subscribe((response: Unit[]) => {
        this.unitList = response;
      });
  }

  fetchPrice() {
    this._price
      .getAll()
      .valueChanges()
      .subscribe((response: PriceType[]) => {
        this.priceList = response;
      });
  }
}
