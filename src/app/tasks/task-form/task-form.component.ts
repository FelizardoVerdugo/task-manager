import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  taskId: number | null = null;
  submitting = false;
  submitError: string | null = null;

  categories = ['desarrollo','diseño','documentación','testing','devops','otro'];
  statuses = ['pendiente','en progreso','completada'];
  priorities = ['baja','media','alta'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title:       ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category:    ['desarrollo', Validators.required],
      priority:    ['media', Validators.required],
      status:      ['pendiente', Validators.required],
      dueDate:     ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.taskId = Number(id);
      this.taskService.getById(this.taskId).then(task => {
        if (task) this.form.patchValue(task);
      });
    }
  }

  get f() { return this.form.controls; }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    this.submitError = null;
    try {
      if (this.isEdit && this.taskId) {
        await this.taskService.update(this.taskId, this.form.value);
      } else {
        await this.taskService.create(this.form.value);
      }
      this.router.navigate(['/tasks']);
    } catch (e: any) {
      this.submitError = e.message;
    } finally {
      this.submitting = false;
    }
  }
}