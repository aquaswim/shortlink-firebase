import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlinkCreateComponent } from './shortlink-create.component';

describe('ShortlinkCreateComponent', () => {
  let component: ShortlinkCreateComponent;
  let fixture: ComponentFixture<ShortlinkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortlinkCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlinkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
