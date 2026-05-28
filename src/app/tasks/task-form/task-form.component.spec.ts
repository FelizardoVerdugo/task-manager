import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('TaskFormComponent', () => {
  let fixture: ComponentFixture<TaskFormComponent>;
  let component: TaskFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    component.form.reset();
    expect(component.form.invalid).toBeTrue();
  });

  it('title should require minimum 3 characters', () => {
    component.f['title'].setValue('ab');
    expect(component.f['title'].errors?.['minlength']).toBeTruthy();
  });

  it('form should be valid with correct data', () => {
    component.form.setValue({
      title: 'Tarea válida de prueba',
      description: 'Descripción suficientemente larga',
      category: 'desarrollo', priority: 'alta',
      status: 'pendiente', dueDate: '2026-12-01'
    });
    expect(component.form.valid).toBeTrue();
  });
});