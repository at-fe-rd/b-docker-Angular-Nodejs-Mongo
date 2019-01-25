import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ApiService, NotificationService } from '../../core/service/index';

interface Error {
  code: string;
  title: string;
  content: string
}

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  error: Error;

  constructor(
    private route: ActivatedRoute
  ) {
    //
  }

  ngOnInit() {
    const arr = ['000', '403', '401', '500'];
    this.route.params.subscribe((params: any) => {
      const code = arr.includes(params['code']) ? params['code'] : '404';
      this.error = {
        code: code,
        title: `error.${code}.title`,
        content: `error.${code}.content`
      };
    });
  }

}
