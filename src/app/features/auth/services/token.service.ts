import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private jwtHelper = new JwtHelperService();

  constructor() {}

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isTokenValid(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      return false;
    }
    try {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
    catch (error) {
      return false;
    }
  }

  hasValidToken(): boolean {
    return this.isTokenValid();
  }

  decodeToken(): any {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      return this.jwtHelper.decodeToken(token);
    }
    catch (error) {
      return null;
    }
  }

}
