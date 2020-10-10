import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IFirestoreLink, ILinkInput} from './link.model';
import * as AES from 'crypto-js/aes';
import * as hexFormat from 'crypto-js/format-hex';
import * as utf8Encoder from 'crypto-js/enc-utf8';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  constructor(private firestore: AngularFirestore) { }

  private static encryptLink(destination: string, password: string): string {
    const aes = AES.encrypt(destination, password);
    return aes.toString();
  }

  unlockLink(encrypted, password): any {
    const link = AES.decrypt(encrypted, password);
    return link.toString(utf8Encoder);
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
