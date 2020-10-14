import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-invoice-service-item',
  templateUrl: './invoice-service-item.component.html',
  styleUrls: ['./invoice-service-item.component.less'],
})
export class InvoiceServiceItemComponent implements OnInit {
  @Input() service: Service;
  // @Input() set index(value) {
  //   if (value !== undefined && value !== null) {
  //     this.isDelete = true;
  //     this.indexService = value;
  //   } else {
  //     this.isDelete = false;
  //   }
  // }
  @Output() delete = new EventEmitter<Service>();
  @Output() update = new EventEmitter<Service>();

  isDelete = false;
  indexService: number;

  constructor() {}

  ngOnInit() {}

  upCount() {
    this.service.count += 1;
    this.doEmit();
  }

  downCount() {
    if (this.service.count > 1) {
      this.service.count -= 1;
      this.doEmit();
    }
  }

  remove() {
    this.delete.emit(this.service);
  }

  doEmit(): void {
    this.update.emit(this.service);
  }
}
