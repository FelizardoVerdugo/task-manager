/// <reference types="jasmine" />
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskService } from './task.service';
import { provideHttpClient } from '@angular/common/http';
describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load all tasks', fakeAsync(() => {
    service.loadAll();
    tick(1000);
    expect(service.tasks().length).toBeGreaterThan(0);
  }));

  it('should filter tasks by category', fakeAsync(() => {
    service.loadAll('diseño');
    tick(1000);
    service.tasks().forEach(t => expect(t.category).toBe('diseño'));
    expect(service.tasks().length).toBeGreaterThan(0);
  }));

  it('should create a new task', fakeAsync(() => {
    service.loadAll();
    tick(1000);
    const before = service.tasks().length;
    let created = false;
    service.create({
      title: 'Test task', description: 'Descripción larga de prueba',
      status: 'pendiente', priority: 'media', category: 'otro', dueDate: '2026-12-01'
    }).then(() => created = true);
    tick(1000);
    expect(service.tasks().length).toBe(before + 1);
  }));

  it('should delete a task', fakeAsync(() => {
    service.loadAll();
    tick(1000);
    expect(service.tasks().length).toBeGreaterThan(0);
    const id = service.tasks()[0].id;
    const before = service.tasks().length;
    service.delete(id);
    tick(1000);
    expect(service.tasks().length).toBe(before - 1);
    expect(service.tasks().find(t => t.id === id)).toBeUndefined();
  }));
});