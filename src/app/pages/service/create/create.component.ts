import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { Unit } from 'src/app/models/unit.model';
import { CurrencyType } from 'src/app/models/price.model';
import { PriceService } from 'src/app/services/price.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ServicesGroupService } from 'src/app/services/servicesGroup.service';
import { ServiceGroup } from 'src/app/models/service.model';

@Component({
  selector: 'app-service-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ServiceCreateComponent implements OnInit {
  unitList: Unit[] = [];
  groupList: ServiceGroup[] = [];
  currencyList: CurrencyType[] = [];
  form: FormGroup;
  loadingPopover: any;

  constructor(
    private _unit: UnitService,
    private _price: PriceService,
    private _fb: FormBuilder,
    private _service: ServicesService,
    private _serviceGroup: ServicesGroupService,
    private _router: Router,
    private _notification: NotificationService
  ) {
    this.form = this._fb.group({
      desc: new FormControl(''),
      count: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      tax: new FormControl(0, [Validators.required]),
      unit: new FormControl('', []),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.fetchUnit();
    this.fetchCurrency();
    this.fetchServiceGroup();
  }

  fetchServiceGroup() {
    this._serviceGroup
      .getAll()
      .valueChanges()
      .subscribe((response: ServiceGroup[]) => {
        this.groupList = response;
      });
  }

  fetchUnit() {
    this._unit
      .getAll()
      .valueChanges()
      .subscribe((response: Unit[]) => {
        this.unitList = response;
        if (this.unitList) {
          this.form.controls.unit.setValue(this.unitList[0]);
        }
      });
  }

  fetchCurrency() {
    this._price
      .getAll()
      .valueChanges()
      .subscribe((response: CurrencyType[]) => {
        this.currencyList = response;
        if (this.currencyList) {
          this.form.controls.currency.setValue(this.currencyList[0]);
        }
      });
  }

  save() {
    this._notification.loading();
    if (this.form.invalid) {
      return;
    }
    this._service
      .add(this.form.value)
      .then((response: any) => {
        this._notification.dismissLoading();
        this.form.reset();
        this._notification.success();
        this._router.navigate(['/service']);
      })
      .catch((error) => {
        this._notification.error(error);
      });
  }
}
