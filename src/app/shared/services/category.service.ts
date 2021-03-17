import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories').snapshotChanges();
    // prefer snapshotChanges(Because it return metadata as well as the data within the document. )
    //rather than valueChanges(Beacuse it return only returns the data within a document (not the metadata) )
  }
}
