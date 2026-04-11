import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-layout-system',
  templateUrl: './layout-system.component.html',
  styleUrls: ['./layout-system.component.scss']
})
export class LayoutSystemComponent implements OnInit {

  isCollapsed = false;
  isLogout: boolean = false;
  isLoading = false;
  currentUser: any = null;
  accessToken: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
      this.accessToken = localStorage.getItem('access_token');
  }

  ngOnInit(): void {

  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

   showLogoutConfirm(): void {
    this.isLogout = true;
  }

  submitLogout(): void {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
}
