import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = [
    { id: 1, title: 'Diseñar wireframes', description: 'Crear mockups en Figma para el dashboard principal.', status: 'completada', priority: 'alta', dueDate: '2026-05-10' },
    { id: 2, title: 'Configurar base de datos', description: 'Instalar PostgreSQL y crear esquema inicial con migraciones.', status: 'en progreso', priority: 'alta', dueDate: '2026-05-20' },
    { id: 3, title: 'Escribir documentación', description: 'Documentar la API REST con Swagger y ejemplos de uso.', status: 'pendiente', priority: 'media', dueDate: '2026-05-28' },
    { id: 4, title: 'Implementar autenticación', description: 'Integrar JWT con refresh tokens y guards de ruta.', status: 'en progreso', priority: 'alta', dueDate: '2026-05-25' },
    { id: 5, title: 'Pruebas unitarias', description: 'Cubrir al menos 80% de cobertura en servicios y componentes.', status: 'pendiente', priority: 'baja', dueDate: '2026-06-05' },
  ];

  private nextId = 6;

  getAll() {
    return [...this.tasks];
  }

  getById(id: number) {
    return this.tasks.find(t => t.id === id) || null;
  }

  create(task: Omit<typeof this.tasks[0], 'id'>) {
    const newTask = { ...task, id: this.nextId++ };
    this.tasks.push(newTask);
    return newTask;
  }
}