import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { EgrService } from 'src/app/services/egr.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-contractor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractorCreateComponent implements OnInit {
  form: FormGroup;
  unpSearch: string;

  constructor(private _fb: FormBuilder, private _egr: EgrService) {
    this.form = this._fb.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {}

  searchByUNP() {
    this._egr
      .getEGRAddressByRegNum(this.unpSearch)
      .subscribe((response: any) => {
        console.log('EGR: ', response);
      });
  }

  save() {
    console.log('Save');
  }
}
