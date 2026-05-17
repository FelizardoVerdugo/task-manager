import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  task = { title: '', description: '', status: 'pendiente', priority: 'media', dueDate: '' };

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.taskService.create({ ...this.task });
      this.router.navigate(['/tasks']);
    }
  }
}