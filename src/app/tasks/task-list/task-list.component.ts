import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { TaskCategory } from '../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ConfirmDialogComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  selectedCategory: TaskCategory | 'todas' = 'todas';
  categories: (TaskCategory | 'todas')[] = ['todas','desarrollo','diseño','documentación','testing','devops','otro'];

  showConfirm = false;
  taskToDelete: number | null = null;

  constructor(public taskService: TaskService) {}

  ngOnInit() { this.taskService.loadAll(); }

  onCategoryChange() { this.taskService.loadAll(this.selectedCategory); }

  confirmDelete(id: number) {
    this.taskToDelete = id;
    this.showConfirm = true;
  }

  async onDeleteConfirmed() {
    if (this.taskToDelete !== null) {
      await this.taskService.delete(this.taskToDelete);
    }
    this.showConfirm = false;
    this.taskToDelete = null;
  }

  onDeleteCancelled() {
    this.showConfirm = false;
    this.taskToDelete = null;
  }
}