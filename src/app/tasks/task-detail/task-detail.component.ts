import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit {
  task: any = null;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getById(id);
  }
}