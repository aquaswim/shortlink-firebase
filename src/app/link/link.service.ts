import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IFirestoreLink, ILinkInput} from './link.model';
import { AES } from 'crypto-es/lib/aes.js';
import { Utf8 } from 'crypto-es/lib/core.js';

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
    return link.toString(Utf8);
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
