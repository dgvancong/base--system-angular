import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-system',
  templateUrl: './layout-system.component.html',
  styleUrls: ['./layout-system.component.scss']
})
export class LayoutSystemComponent implements OnInit {

  isCollapsed = false;

  constructor() {

  }

  ngOnInit(): void {

  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
