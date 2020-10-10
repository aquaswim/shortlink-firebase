import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IFirestoreLink} from '../link.model';
import {LinkService} from '../link.service';
import sleep from '../../helpers/sleep';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.css']
})
export class RedirectorComponent implements OnInit {
  isLoading = true;
  link: IFirestoreLink;
  inputPasswordForm = new FormControl('');
  passwordValid = true;

  constructor(private route: ActivatedRoute, private router: Router, private linkService: LinkService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async paramMap => {
      const link = await this.linkService.getLinkDetail(paramMap.get('id'));
      if (!link) {
        await this.router.navigate(['/'], {
          queryParams: {
            newslug: paramMap.get('id'),
          }
        });
        return;
      }
      this.link = link;
      this.isLoading = false;
      if (!this.link.encrypted) {
        sleep(1945).then(() => this.goToLink());
      }
    });
  }

  goToLink(): void {
    window.location.href = this.link.destination;
  }

  onUnlockLink(): void {
    const decryptedLink = this.linkService.unlockLink(this.link.destination, this.inputPasswordForm.value);
    if (decryptedLink){
      this.link.destination = decryptedLink;
      this.link.encrypted = false;
      sleep(1945).then(() => this.goToLink());
    } else {
      this.passwordValid = false;
    }
  }
}
