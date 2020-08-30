import { Component, OnInit, Input } from '@angular/core';
import { Contractor } from 'src/app/models/contractor.model';

@Component({
  selector: 'app-contractor-item',
  templateUrl: './contractor-item.component.html',
  styleUrls: ['./contractor-item.component.less'],
})
export class ContractorItemComponent implements OnInit {
  @Input() contractor: Contractor;

  constructor() {}

  ngOnInit() {}
}
