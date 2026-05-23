import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" *ngIf="visible" (click)="onCancel()">
      <div class="dialog" (click)="$event.stopPropagation()">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="dialog-actions">
          <button class="btn-cancel" (click)="onCancel()">Cancelar</button>
          <button class="btn-danger" (click)="onConfirm()">Eliminar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay { position:fixed; inset:0; background:rgba(0,0,0,.6);
      display:flex; align-items:center; justify-content:center; z-index:1000; }
    .dialog { background:#1a1d27; border:1px solid #f87171; border-radius:12px;
      padding:2rem; max-width:400px; width:90%; }
    h3 { color:#f87171; margin-bottom:.5rem; }
    p { color:#94a3b8; margin-bottom:1.5rem; }
    .dialog-actions { display:flex; gap:1rem; justify-content:flex-end; }
    .btn-cancel { background:#2d3148; color:#e2e8f0; border:none;
      padding:.6rem 1.2rem; border-radius:8px; cursor:pointer; }
    .btn-danger { background:#f87171; color:#fff; border:none;
      padding:.6rem 1.2rem; border-radius:8px; cursor:pointer; }
    .btn-danger:hover { background:#ef4444; }
  `]
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() title = '¿Eliminar tarea?';
  @Input() message = 'Esta acción no se puede deshacer.';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm() { this.confirmed.emit(); }
  onCancel() { this.cancelled.emit(); }
}