import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {IconCustomService} from './core/services/icon/icon-system.service'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})

export class AppComponent {
  constructor(
    private customIconService: IconCustomService,
    private title: Title
  ) {}

}
