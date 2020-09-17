import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IFirestoreLink} from '../link.model';
import {LinkService} from '../link.service';
import sleep from '../../helpers/sleep';

@Component({
  selector: 'app-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.css']
})
export class RedirectorComponent implements OnInit {
  isLoading = true;
  link: IFirestoreLink;

  constructor(private route: ActivatedRoute, private router: Router, private linkService: LinkService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async paramMap => {
      const link = await this.linkService.getLinkDetail(paramMap.get('id'));
      if (!link) {
        // todo redirect to create page
        await this.router.navigate(['error', '404']);
        return;
      }
      this.link = link;
      this.isLoading = false;
      sleep(1945).then(() => this.goToLink());
    });
  }

  goToLink(): void {
    window.location.href = this.link.destination;
  }
}
