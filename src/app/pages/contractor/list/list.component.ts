import { Component, OnInit } from '@angular/core';
import { Contractor } from 'src/app/models/contractor.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ContractorService } from 'src/app/services/contractor.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ContractorListComponent implements OnInit {
  contractorList: Contractor[] = [];
  isLoaded: boolean;

  constructor(
    public _db: AngularFireDatabase,
    private _contractor: ContractorService,
    private _loading: LoadingController,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.isLoaded = false;
    this._contractor
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            _doc: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data: Contractor[]) => {
        this.contractorList = data;
        this.isLoaded = true;
      });
  }

  createNew() {
    this._router.navigate(['contractor/create'], { replaceUrl: true });
  }

  // deleteContractor(_id: string) {
  //   this._contractor.delete(_id).catch((error) => {
  //     console.log('Error delete: ', error);
  //   });
  // }
}
