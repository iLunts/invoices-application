import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.less'],
})
export class FieldComponent implements OnInit {
  @Input() label: any;
  @Input() value: any;

  constructor() {}

  ngOnInit() {}
}
