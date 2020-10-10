import { Component, OnInit } from '@angular/core';
import { Act } from 'src/app/models/act.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActService } from 'src/app/services/act.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cats-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ActsListComponent implements OnInit {
  listData: Act[] = [];
  actStatuses: any[] = [];
  isLoaded: boolean;

  constructor(
    public _db: AngularFireDatabase,
    private _act: ActService,
    private _router: Router,
    private _notification: NotificationService
  ) {}

  ngOnInit() {
    this.fetchStatuses();
    this.fetch();
  }

  fetchStatuses() {
    this._act.getAllStatus().subscribe((data: any) => {
      this.actStatuses = data;
    });
  }

  fetch() {
    this.isLoaded = false;
    this._act.getAll().subscribe((response: any) => {
      this.listData = response;
      this.isLoaded = true;
    });
  }

  delete(_id: string) {
    this._act.delete(_id).then((response: any) => {
      this._notification.success('Акт успешно удален');
    });
  }

  createNew() {
    this._router.navigate(['act/create'], { replaceUrl: true });
  }
}
