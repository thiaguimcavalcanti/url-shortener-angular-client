import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRedirectComponent } from './page-redirect.component';

describe('PageRedirectComponent', () => {
  let component: PageRedirectComponent;
  let fixture: ComponentFixture<PageRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
