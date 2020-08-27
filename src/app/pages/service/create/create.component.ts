import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { Unit } from 'src/app/models/unit.model';
import { PriceType } from 'src/app/models/price.model';
import { PriceService } from 'src/app/services/price.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ServiceCreateComponent implements OnInit {
  unitList: Unit[] = [];
  priceList: PriceType[] = [];
  form: FormGroup;
  loadingPopover: any;

  constructor(
    private _unit: UnitService,
    private _price: PriceService,
    private _fb: FormBuilder,
    private _service: ServicesService,
    private _loading: LoadingController,
    private _router: Router
  ) {
    this.form = this._fb.group({
      _groupId: new FormControl(''),
      desc: new FormControl('', [Validators.required]),
      count: new FormControl('', [Validators.required]),
      groupName: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      tax: new FormControl('', [Validators.required]),
      unit: new FormControl('', []),
    });
  }

  get f() {
    return this.form.controls;
  }

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

  save() {
    this.showLoading();
    if (this.form.invalid) {
      return;
    }
    this._service.add(this.form.value).then((response: any) => {
      this._loading.dismiss();
      this.form.reset();
      this._router.navigate(['/service']);
    });
  }

  async showLoading() {
    this.loadingPopover = await this._loading.create({
      message: 'Ожидайте...',
      duration: 5000,
      spinner: 'bubbles',
    });
    await this.loadingPopover.present();
  }
}
