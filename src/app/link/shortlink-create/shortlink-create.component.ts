import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LinkService} from '../link.service';
import {ILinkInput} from '../link.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shortlink-create',
  templateUrl: './shortlink-create.component.html',
  styleUrls: ['./shortlink-create.component.css']
})
export class ShortlinkCreateComponent implements OnInit {
  createLinkForm = new FormGroup({
    destination: new FormControl('', [
      Validators.required,
      Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)
    ]),
    slug: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[^/\\?&=#]+$/i)
    ]),
    password: new FormControl('')
  });

  isLoading = true;
  isLinkCreated = false;

  constructor(private linkService: LinkService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.activatedRoute.queryParams.subscribe(param => {
      // idk why i have to do this
      setTimeout(() => {
        this.regenerateForm(param.newslug);
      }, 10);
    });
  }

  async onCreateLink(): Promise<void> {
    if (!this.createLinkForm.valid) {
      return;
    }
    try{
      this.isLoading = true;
      await this.linkService.createLink(this.createLinkForm.value as ILinkInput);
      this.isLoading = false;
      this.isLinkCreated = true;
      // todo clear query string
    }catch (e) {
      alert(e);
    }
  }

  regenerateForm(slug?: string): void {
    // generate id
    this.createLinkForm.patchValue({
      slug: slug || this.linkService.generateLinkSlug(),
      destination: '',
      password: ''
    });
    this.isLinkCreated = false;
  }
}
