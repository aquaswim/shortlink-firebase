import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IFirestoreLink, ILinkInput} from './link.model';
import * as hmacSHA256 from 'crypto-js/hmac-sha256';
import * as hexEncoder from 'crypto-js/enc-hex';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  constructor(private firestore: AngularFirestore) { }

  private static encryptLink(destination: string, password: string): string {
    const hmac = hmacSHA256(destination, password);
    return hmac.toString(hexEncoder);
  }

  async getLinkDetail(id): Promise<IFirestoreLink | null> {
    const doc = await this.firestore.collection('links').doc(id).get().toPromise();
    return doc.data() as IFirestoreLink;
  }

  generateLinkSlug(): string {
    return this.firestore.createId();
  }

  createLink(link: ILinkInput): Promise<void> {
    const encrypted: boolean = Boolean(link.password);
    return this.firestore.collection('links').doc<IFirestoreLink>(link.slug).set({
      destination: encrypted ? LinkService.encryptLink(link.destination, link.password) : link.destination,
      type: 'link',
      encrypted
    });
  }
}
