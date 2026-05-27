import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../core/services/task.service';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('TaskListComponent', () => {
  let fixture: ComponentFixture<TaskListComponent>;
  let component: TaskListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAll on init', () => {
    const service = TestBed.inject(TaskService);
    spyOn(service, 'loadAll');
    component.ngOnInit();
    expect(service.loadAll).toHaveBeenCalled();
  });

  it('should open confirm dialog on delete', () => {
    component.confirmDelete(1);
    expect(component.showConfirm).toBeTrue();
    expect(component.taskToDelete).toBe(1);
  });

  it('should close dialog on cancel', () => {
    component.confirmDelete(1);
    component.onDeleteCancelled();
    expect(component.showConfirm).toBeFalse();
    expect(component.taskToDelete).toBeNull();
  });
});