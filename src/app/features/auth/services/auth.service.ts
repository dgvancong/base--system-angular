import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  UserInfo,
} from 'src/app/core/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/auth';
  private currentUserSubject = new BehaviorSubject<UserInfo | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.tokenService.setTokens(
              response.data.accessToken,
              response.data.refreshToken,
            );
            this.setCurrentUser(response.data.user);
          }
        }),
        catchError(this.handleError),
      );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => {
        console.log('Registration successful:', response);
      }),
      catchError(this.handleError),
    );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    const request: RefreshTokenRequest = { refreshToken };
    return this.http
      .post<RefreshTokenResponse>(`${this.apiUrl}/refresh`, request)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.tokenService.setTokens(
              response.data.accessToken,
              response.data.refreshToken,
            );
            this.setCurrentUser(response.data.user);
          }
        }),
        catchError(this.handleError),
      );
  }

  logout(): void {
    const refreshToken = this.tokenService.getRefreshToken();
    if (refreshToken) {
      this.http.post(`${this.apiUrl}/logout`, { refreshToken }).subscribe({
        next: () => {
          this.clearAuthData();
        },
        error: (error) => {
          console.error('Logout error:', error);
          this.clearAuthData();
        },
      });
    } else {
      this.clearAuthData();
    }
  }

  private clearAuthData(): void {
    this.tokenService.clearTokens();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setCurrentUser(user: UserInfo): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.tokenService.hasValidToken();
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.error?.errors) {
      errorMessage = error.error.errors.join(', ');
    } else if (error.status === 401) {
      errorMessage = 'Invalid email or password';
    } else if (error.status === 403) {
      errorMessage = error.error?.message || 'Account is locked';
    } else if (error.status === 409) {
      errorMessage = error.error?.message || 'Email or username already exists';
    }
    return throwError(() => new Error(errorMessage));
  }
}
