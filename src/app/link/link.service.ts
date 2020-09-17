import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IFirestoreLink} from './link.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  constructor(private firestore: AngularFirestore) { }

  async getLinkDetail(id): Promise<IFirestoreLink | null> {
    const doc = await this.firestore.collection('links').doc(id).get().toPromise();
    return doc.data() as IFirestoreLink;
  }
}
