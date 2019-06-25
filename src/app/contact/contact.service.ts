import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private angularFirestore: AngularFirestore) {}

  getAll() {
    return this.angularFirestore.collection('contacts').snapshotChanges();
  }

  get(id: any) {
    this.angularFirestore.doc('contacts/' + id).get();
  }

  save(contact: any) {
    return this.angularFirestore.collection('contacts').add(contact);
  }

  update(id: any, contact: any) {
    this.angularFirestore.doc('contacts/' + id).update(contact);
  }

  delete(id: any) {
    this.angularFirestore.doc('contacts/' + id).delete();
  }
}
