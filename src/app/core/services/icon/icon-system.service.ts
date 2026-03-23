import { Injectable } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { customIcons } from './icon-system';

@Injectable({
  providedIn: 'root'
})

export class IconCustomService {
  constructor(public iconService: NzIconService) {
    this.registerCustomIcons();
  }

  public registerCustomIcons(): void {
    for (const [key, svg] of Object.entries(customIcons)) {
      this.iconService.addIconLiteral(`ng-zorro:${key}`, svg);
    }
  }
}