import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideRouter } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with valid credentials', async () => {
    const res = await service.login({ email: 'felizardo@demo.com', password: '123456' });
    expect(res.user.email).toBe('felizardo@demo.com');
    expect(res.token).toBeTruthy();
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should reject invalid credentials', async () => {
    await expectAsync(
      service.login({ email: 'wrong@demo.com', password: 'wrong' })
    ).toBeRejectedWithError('Credenciales incorrectas');
  });

  it('should register a new user', async () => {
    const res = await service.register({ name: 'Test', email: 'test@new.com', password: 'abc123' });
    expect(res.user.name).toBe('Test');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should reject duplicate email on register', async () => {
    await expectAsync(
      service.register({ name: 'X', email: 'felizardo@demo.com', password: '123456' })
    ).toBeRejectedWithError('El email ya está registrado');
  });

  it('should logout and clear state', async () => {
    await service.login({ email: 'felizardo@demo.com', password: '123456' });
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.currentUser()).toBeNull();
    expect(localStorage.getItem('tm_token')).toBeNull();
  });
});