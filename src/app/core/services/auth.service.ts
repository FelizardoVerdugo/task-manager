import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, LoginPayload, RegisterPayload, AuthResponse } from '../models/user.model';

const TOKEN_KEY = 'tm_token';
const USER_KEY  = 'tm_user';

// Usuarios mock registrados
const MOCK_USERS: (User & { password: string })[] = [
  { id: 1, name: 'Felizardo Verdugo', email: 'felizardo@demo.com', password: '123456' },
  { id: 2, name: 'Manuel Gaxiola', email: 'manuel@demo.com', password: '123456' },
];

function makeFakeJWT(user: User): string {
  const header  = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ sub: user.id, email: user.email, name: user.name, iat: Date.now() }));
  const sig     = btoa('fake-signature');
  return `${header}.${payload}.${sig}`;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _currentUser = signal<User | null>(this.loadUser());
  private _token       = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  currentUser = this._currentUser.asReadonly();
  token       = this._token.asReadonly();
  isLoggedIn  = computed(() => !!this._token());

  constructor(private router: Router) {}

  private loadUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  private persist(user: User, token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._token.set(token);
    this._currentUser.set(user);
  }

  login(payload: LoginPayload): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = MOCK_USERS.find(
          u => u.email === payload.email && u.password === payload.password
        );
        if (!found) { reject(new Error('Credenciales incorrectas')); return; }
        const { password, ...user } = found;
        const token = makeFakeJWT(user);
        this.persist(user, token);
        resolve({ user, token });
      }, 700);
    });
  }

  register(payload: RegisterPayload): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = MOCK_USERS.find(u => u.email === payload.email);
        if (exists) { reject(new Error('El email ya está registrado')); return; }
        const newUser: User = { id: Date.now(), name: payload.name, email: payload.email };
        MOCK_USERS.push({ ...newUser, password: payload.password });
        const token = makeFakeJWT(newUser);
        this.persist(newUser, token);
        resolve({ user: newUser, token });
      }, 700);
    });
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._token.set(null);
    this._currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return this._token();
  }
}