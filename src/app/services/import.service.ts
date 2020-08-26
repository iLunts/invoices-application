import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Bank } from '../models/bank.model';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  private _jsonURL = 'app/importData/banks.json';
  private dbPathBank = '/banks';

  constructor(private _http: HttpClient, private _fs: AngularFirestore) {}

  importBanks() {
    this._http.get('https://www.nbrb.by/api/bic').subscribe((data: any) => {
      if (data) {
        data.forEach((element: Bank) => {
          const pushkey = this._fs.createId();
          element._doc = pushkey;
          this._fs
            .collection('/banks')
            .doc(pushkey)
            .set({ ...element });
        });
        // this._notification.success('Банки успешно импортированы');
      }
    });
  }

  importAll() {
    let dataList: any[] = [];

    this.getJSON().subscribe((data: any) => {
      dataList = data;
    });

    dataList.forEach((element: any) => {
      const pushkey = this._fs.createId();
      element._doc = pushkey;
      this._fs
        .collection(this.dbPathBank)
        .doc(pushkey)
        .set({ ...element });
    });
    // this._notification.success('Банки успешно импортированы');
  }

  public getJSON(): Observable<any> {
    return this._http.get(this._jsonURL);
  }
}
