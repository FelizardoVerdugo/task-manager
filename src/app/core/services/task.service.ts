import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { Task, TaskFormData, TaskCategory } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  // --- Datos mock (simula backend) ---
  private mockTasks: Task[] = [
    { id: 1, title: 'Diseñar wireframes', description: 'Crear mockups en Figma para el dashboard.', status: 'completada', priority: 'alta', category: 'diseño', dueDate: '2026-05-10' },
    { id: 2, title: 'Configurar base de datos', description: 'Instalar PostgreSQL y crear esquema inicial.', status: 'en progreso', priority: 'alta', category: 'devops', dueDate: '2026-05-20' },
    { id: 3, title: 'Escribir documentación', description: 'Documentar la API REST con Swagger.', status: 'pendiente', priority: 'media', category: 'documentación', dueDate: '2026-05-28' },
    { id: 4, title: 'Implementar autenticación', description: 'Integrar JWT con refresh tokens.', status: 'en progreso', priority: 'alta', category: 'desarrollo', dueDate: '2026-05-25' },
    { id: 5, title: 'Pruebas unitarias', description: 'Cubrir 80% de cobertura en servicios.', status: 'pendiente', priority: 'baja', category: 'testing', dueDate: '2026-06-05' },
    { id: 6, title: 'Setup CI/CD pipeline', description: 'Configurar GitHub Actions para deploy automático.', status: 'pendiente', priority: 'media', category: 'devops', dueDate: '2026-06-10' },
  ];
  private nextId = 7;

  // --- Signals de estado ---
  tasks = signal<Task[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  private simulate<T>(fn: () => T, delayMs = 600) {
    this.loading.set(true);
    this.error.set(null);
    return new Promise<T>((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(fn());
        } catch (e: any) {
          reject(e);
        }
        this.loading.set(false);
      }, delayMs);
    });
  }

  loadAll(category?: TaskCategory | 'todas') {
    this.simulate(() => {
      const filtered = (!category || category === 'todas')
        ? [...this.mockTasks]
        : this.mockTasks.filter(t => t.category === category);
      this.tasks.set(filtered);
    });
  }

  getById(id: number): Promise<Task | null> {
    return this.simulate(() => this.mockTasks.find(t => t.id === id) ?? null);
  }

  create(data: TaskFormData): Promise<Task> {
    return this.simulate(() => {
      const task: Task = { ...data, id: this.nextId++ };
      this.mockTasks.push(task);
      this.tasks.set([...this.mockTasks]);
      return task;
    });
  }

  update(id: number, data: TaskFormData): Promise<Task> {
    return this.simulate(() => {
      const idx = this.mockTasks.findIndex(t => t.id === id);
      if (idx === -1) throw new Error('Tarea no encontrada');
      this.mockTasks[idx] = { ...this.mockTasks[idx], ...data };
      this.tasks.set([...this.mockTasks]);
      return this.mockTasks[idx];
    });
  }

  delete(id: number): Promise<void> {
    return this.simulate(() => {
      this.mockTasks = this.mockTasks.filter(t => t.id !== id);
      this.tasks.set([...this.mockTasks]);
    });
  }
}