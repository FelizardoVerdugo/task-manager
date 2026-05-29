# ⚡ TaskManager UI

Aplicación web SPA (Single Page Application) construida con **Angular 21** y **JavaScript/TypeScript**, que permite gestionar tareas con autenticación, filtros, formularios reactivos y navegación protegida.

---

## Tabla de contenidos

- [Demo](#demo)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Autenticación](#autenticación)
- [Arquitectura](#arquitectura)
- [Tests](#tests)
- [Scripts disponibles](#scripts-disponibles)

---

##  Demo

Credenciales de acceso para pruebas:

| Email | Contraseña |
|---|---|
| `felizardo@demo.com` | `123456` |
| `manuel@demo.com` | `123456` |


---

##  Características

-  **Autenticación** — Login, registro y logout con JWT simulado
-  **Rutas protegidas** — AuthGuard y PublicGuard
-  **Listado de tareas** — Con estados de carga y error
-  **Filtro por categoría** — desarrollo, diseño, testing, devops, etc.
-  **Crear / Editar tareas** — Formularios reactivos con validaciones
-  **Eliminar con confirmación** — Diálogo de confirmación antes de borrar
-  **Interceptores HTTP** — Inyección de JWT y manejo global de errores
-  **Lazy Loading** — Carga diferida en módulos de auth y tareas
-  **23 Unit Tests** — Cobertura en servicios, guards y componentes

---

##  Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 21.2.x | Framework principal |
| TypeScript | 5.9.x | Lenguaje |
| RxJS | 7.8.x | Programación reactiva |
| Angular Router | 21.2.x | Navegación y lazy loading |
| Angular Forms | 21.2.x | Formularios reactivos |
| Angular HttpClient | 21.2.x | Llamadas HTTP + interceptores |
| Karma + Jasmine | 6.4.x | Testing unitario |
| Angular CLI | 21.2.x | Herramienta de desarrollo |

---

##  Estructura de carpetas

```
task-manager/
│
├── src/
│   ├── app/
│   │   │
│   │   ├── core/                          # Lógica central de la app (singleton)
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts          # AuthGuard + PublicGuard
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts    # Inyecta Bearer token en requests
│   │   │   │   └── error.interceptor.ts   # Manejo global de errores HTTP
│   │   │   ├── models/
│   │   │   │   ├── task.model.ts          # Interfaces Task, TaskFormData, enums
│   │   │   │   └── user.model.ts          # Interfaces User, LoginPayload, AuthResponse
│   │   │   └── services/
│   │   │       ├── auth.service.ts        # Login, registro, logout, JWT
│   │   │       ├── auth.service.spec.ts   # 6 tests de AuthService
│   │   │       ├── task.service.ts        # CRUD tareas + signals de estado
│   │   │       └── task.service.spec.ts   # 5 tests de TaskService
│   │   │
│   │   ├── features/                      # Features lazy-loaded
│   │   │   └── auth/
│   │   │       ├── login/
│   │   │       │   ├── login.component.ts
│   │   │       │   └── login.component.html
│   │   │       ├── register/
│   │   │       │   ├── register.component.ts
│   │   │       │   └── register.component.html
│   │   │       └── auth.routes.ts         # Rutas de autenticación
│   │   │
│   │   ├── shared/                        # Componentes reutilizables
│   │   │   └── confirm-dialog.component.ts  # Diálogo de confirmación
│   │   │
│   │   ├── tasks/                         # Feature de tareas
│   │   │   ├── task-list/
│   │   │   │   ├── task-list.component.ts
│   │   │   │   ├── task-list.component.html
│   │   │   │   ├── task-list.component.spec.ts  # 4 tests
│   │   │   │   └── task-list.css
│   │   │   ├── task-form/
│   │   │   │   ├── task-form.component.ts
│   │   │   │   ├── task-form.component.html
│   │   │   │   ├── task-form.component.spec.ts  # 4 tests
│   │   │   │   └── task-form.css
│   │   │   └── task-detail/
│   │   │       ├── task-detail.component.ts
│   │   │       ├── task-detail.component.html
│   │   │       └── task-detail.css
│   │   │
│   │   ├── app.component.ts               # Componente raíz + navbar
│   │   ├── app.component.html             # Layout principal
│   │   ├── app.config.ts                  # Configuración: router, http, interceptores
│   │   └── app.routes.ts                  # Rutas principales + lazy loading
│   │
│   ├── main.ts                            # Bootstrap de la aplicación
│   └── styles.css                         # Estilos globales
│
├── angular.json                           # Configuración Angular CLI
├── karma.conf.js                          # Configuración Karma para tests
├── package.json                           # Dependencias del proyecto
├── tsconfig.json                          # Configuración TypeScript base
├── tsconfig.app.json                      # TypeScript para la app
├── tsconfig.spec.json                     # TypeScript para tests
└── README.md
```

---

## Instalación

### Prerequisitos

- [Node.js](https://nodejs.org) v18 o superior
- npm v9 o superior
- Angular CLI v21

```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli

# Verificar instalación
ng version
```

### Clonar e instalar

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd task-manager

# Instalar dependencias
npm install

# Correr en desarrollo
ng serve --open
```

La app estará disponible en `http://localhost:4200`.

---

## Uso

### Navegar a la app

```
http://localhost:4200
```

Serás redirigido automáticamente a `/auth/login` si no estás autenticado.

### Rutas disponibles

| Ruta | Descripción | Protegida |
|---|---|---|
| `/auth/login` | Inicio de sesión | Pública |
| `/auth/register` | Registro de usuario | Pública |
| `/tasks` | Listado de tareas |  Privada |
| `/tasks/new` | Crear nueva tarea |  Privada |
| `/tasks/:id` | Detalle de tarea |  Privada |
| `/tasks/:id/edit` | Editar tarea |  Privada |

---

## Autenticación

La autenticación usa un sistema **mock con JWT simulado** (sin backend real). El token se almacena en `localStorage` y se inyecta automáticamente en cada request HTTP mediante el `AuthInterceptor`.

### Flujo de autenticación

```
Usuario → Login → AuthService.login() → JWT mock → localStorage
                                                   ↓
Rutas privadas → AuthGuard → verifica token → permite o redirige a /auth/login
                                                   ↓
HTTP requests → AuthInterceptor → agrega Authorization: Bearer <token>
```

### Usuarios mock disponibles

Los usuarios están definidos en `auth.service.ts`. Para agregar uno nuevo, edita el array `MOCK_USERS`:

```typescript
const MOCK_USERS = [
  { id: 1, name: 'Felizardo Verdugo', email: 'felizardo@demo.com', password: '123456' },
  { id: 2, name: 'Manuel Gaxiola', email: 'manuel@demo.com', password: '123456' }
  // Agrega tu usuario aquí
];
```

---

## Arquitectura

### Patrón Core / Features / Shared

```
core/        → Servicios singleton, guards, interceptores, modelos
features/    → Módulos lazy-loaded independientes (auth, etc.)
shared/      → Componentes reutilizables entre features
tasks/       → Feature principal de gestión de tareas
```

### Signals de estado en TaskService

El servicio usa **Angular Signals** para manejar el estado reactivo:

```typescript
tasks   = signal<Task[]>([]);    // Lista de tareas
loading = signal(false);          // Estado de carga
error   = signal<string | null>(null);  // Mensaje de error
```

### Lazy Loading

Las rutas usan `loadComponent` y `loadChildren` para carga diferida:

```typescript
{
  path: 'auth',
  loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
}
```

---

## Tests

El proyecto incluye **23 tests unitarios** con Karma + Jasmine.

### Correr los tests

```bash
ng test
```

### Cobertura de tests

| Archivo | Tests | Descripción |
|---|---|---|
| `auth.service.spec.ts` | 6 | Login, registro, logout, validaciones |
| `task.service.spec.ts` | 5 | CRUD, filtros, estados |
| `auth.guard.spec.ts` | 4 | AuthGuard y PublicGuard |
| `task-list.component.spec.ts` | 4 | Renderizado, confirmación, eliminación |
| `task-form.component.spec.ts` | 4 | Validaciones, estado del formulario |
| **Total** | **23** | **100% pasando** |

---

## Scripts disponibles

```bash
# Servidor de desarrollo
ng serve

# Servidor con apertura automática del navegador
ng serve --open

# Build de producción
ng build

# Correr tests
ng test

# Build en modo watch
ng build --watch --configuration development
```

---

## Categorías de tareas

Las tareas se pueden clasificar en las siguientes categorías:

- `desarrollo` — Código y programación
- `diseño` — UI/UX y mockups
- `documentación` — Docs y README
- `testing` — Pruebas y QA
- `devops` — CI/CD, infraestructura
- `otro` — Misceláneos

---

## Diseño

La aplicación usa un tema **dark mode** con paleta de colores:

| Color | Uso | Hex |
|---|---|---|
| Púrpura | Acento principal | `#7c6af7` |
| Fondo oscuro | Background | `#0f1117` |
| Card | Superficie | `#1a1d27` |
| Borde | Separadores | `#2d3148` |
| Rojo | Error / Eliminar | `#f87171` |
| Verde | Éxito / Completado | `#4ade80` |
| Amarillo | Advertencia / En progreso | `#fbbf24` |
| Azul | Info / Pendiente | `#60a5fa` |

---

## Felizardo Verdugo

Desarrollado como práctica de Angular 21 con arquitectura Core/Shared/Features, lazy loading, formularios reactivos y testing unitario.
