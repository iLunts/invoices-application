import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicesGroupService } from 'src/app/services/servicesGroup.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-service-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.less'],
})
export class ServiceGroupCreateComponent implements OnInit {
  form: FormGroup;
  loadingPopover: any;

  constructor(
    private _fb: FormBuilder,
    private _serviceGroup: ServicesGroupService,
    private _router: Router,
    private _notification: NotificationService
  ) {
    this.form = this._fb.group({
      name: new FormControl('', [Validators.required]),
      desc: new FormControl(''),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {}

  save() {
    this._notification.loading();
    if (this.form.invalid) {
      return;
    }
    this._serviceGroup
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
