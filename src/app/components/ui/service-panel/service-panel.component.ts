import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-service-panel',
  templateUrl: './service-panel.component.html',
  styleUrls: ['./service-panel.component.less'],
})
export class ServicePanelComponent implements OnInit {
  @Input() isViewMode = true;
  @Input() isSelectMode = false;
  @Input() set setService(value) {
    if (value) {
      this.selectedService = value;
    }
  }
  @Output() service = new EventEmitter<Service>();
  @Output() select = new EventEmitter<Service>();
  selectedService: Service;

  constructor() {}

  ngOnInit() {}

  selectService() {
    this.select.emit(this.selectedService);
  }
}
