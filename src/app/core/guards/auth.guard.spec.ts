import { TestBed } from '@angular/core/testing';
import { authGuard, publicGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { provideRouter, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authService: AuthService;
  let router: Router;

  const fakeRoute = {} as ActivatedRouteSnapshot;
  const fakeState = {} as RouterStateSnapshot;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('authGuard should block unauthenticated user', () => {
    const result = TestBed.runInInjectionContext(() => authGuard(fakeRoute, fakeState));
    expect(result).toBeFalse();
  });

  it('authGuard should allow authenticated user', async () => {
    await authService.login({ email: 'felizardo@demo.com', password: '123456' });
    const result = TestBed.runInInjectionContext(() => authGuard(fakeRoute, fakeState));
    expect(result).toBeTrue();
  });

  it('publicGuard should allow unauthenticated user', () => {
    const result = TestBed.runInInjectionContext(() => publicGuard(fakeRoute, fakeState));
    expect(result).toBeTrue();
  });

  it('publicGuard should block authenticated user', async () => {
    await authService.login({ email: 'felizardo@demo.com', password: '123456' });
    const result = TestBed.runInInjectionContext(() => publicGuard(fakeRoute, fakeState));
    expect(result).toBeFalse();
  });
});