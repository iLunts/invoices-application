import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accordion-line',
  templateUrl: './accordion-line.component.html',
  styleUrls: ['./accordion-line.component.less'],
})
export class AccordionLineComponent implements OnInit {
  @Input() title: string;
  @Input() isCollapse: boolean = false;
  @Output() change = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  collapse() {
    this.isCollapse = !this.isCollapse;
    this.change.emit(this.isCollapse);
  }
}
