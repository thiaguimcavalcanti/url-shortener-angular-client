import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-redirect',
  templateUrl: './page-redirect.component.html',
  styleUrls: ['./page-redirect.component.css']
})
export class PageRedirectComponent implements OnInit {

  constructor(private service: UrlService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.service.findById(params['id']).subscribe(res => window.location.href = res.url);
    });
  }
}
