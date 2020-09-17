import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IFirestoreLink} from '../link.model';

@Component({
  selector: 'app-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.css']
})
export class RedirectorComponent implements OnInit {
  isLoading = true;
  link: IFirestoreLink;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async paramMap => {
      console.log(paramMap.get('id'));
    });
  }

  goToLink(): void {
    alert(this.link.destination);
  }
}
