import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private oauthService: OAuthService, private authService: AuthenticationService) {

  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    if (this.authService.isInitialized() || await this.authService.waitForInitializationToFinish()) {
      const access: string | boolean = await this.authService.login(state.url);

      if (typeof access === 'string') {
        // Avoid redirect loop when auth returns the same target URL.
        // This app uses onSameUrlNavigation='reload', so redirecting to the same
        // URL would repeatedly re-run guards and flood navigation.
        if (access === state.url) {
          return true;
        }
        return this.router.parseUrl(access);
      } else {
        return access;
      }
    }
    return this.router.parseUrl('/error');
  }

  private async delay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}
