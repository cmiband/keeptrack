import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskStatusData } from '../constants';

interface AddForm {
  label: string;
  color: string;
  insertAfterOrder: number | null;
}

@Component({
  selector: 'app-status-edit-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './status-edit-modal.html',
  styleUrl: './status-edit-modal.css',
})
export class StatusEditModal {
  @Input() statuses: TaskStatusData[] = [];

  @Input() boardId: string = "";
 
  @Output() save = new EventEmitter<TaskStatusData[]>();
 
  @Output() dismiss = new EventEmitter<void>();
 
 
  workingList = signal<TaskStatusData[]>([]);
  sortedList = computed(() =>
    [...this.workingList()].sort((a, b) => a.statusOrder - b.statusOrder)
  );
 
  activeInsertAfterOrder = signal<number | null | undefined>(undefined);
  addFormOpen = signal(false);
 
  form: AddForm = { label: '', color: '#6366F1', insertAfterOrder: null };
  
  ngOnInit(): void {
    const sorted = [...this.statuses]
      .sort((a, b) => a.statusOrder - b.statusOrder)
      .map((s, i) => ({ ...s, statusOrder: i + 1 }));
    this.workingList.set(sorted);
  }
  
  get isFormOpen(): boolean {
    return this.addFormOpen();
  }
 
  openAddForm(insertAfterOrder: number | null): void {
    this.form = { label: '', color: '#6366F1', insertAfterOrder };
    this.activeInsertAfterOrder.set(insertAfterOrder);
    this.addFormOpen.set(true);
  }
 
  closeAddForm(): void {
    this.addFormOpen.set(false);
    this.activeInsertAfterOrder.set(undefined);
  }
 
  confirmAdd(): void {
    if (!this.form.label.trim()) return;
 
    const sorted = this.sortedList();
    const insertAfter = this.form.insertAfterOrder;
    console.log('insert after', insertAfter);
 
    const insertIdx =
      insertAfter === null
        ? 0
        : sorted.findIndex((s) => s.statusOrder === insertAfter) + 1;
 
    const newStatus: TaskStatusData = {
      taskStatusId: "",
      statusOrder: -1,
      statusLabel: this.form.label.trim(),
      statusName: this.toApiName(this.form.label.trim()),
      statusColor: this.form.color,
      boardId: this.boardId
    };
 
    const reindexed = [
      ...sorted.slice(0, insertIdx),
      newStatus,
      ...sorted.slice(insertIdx),
    ].map((s, i) => ({ ...s, statusOrder: i + 1 }));
    console.log(reindexed);
 
    this.workingList.set(reindexed);
    this.closeAddForm();
  }
 
  removeStatus(id: string): void {
    const reindexed = this.workingList()
      .filter((s) => s.taskStatusId !== id)
      .sort((a, b) => a.statusOrder - b.statusOrder)
      .map((s, i) => ({ ...s, order: i + 1 }));
    this.workingList.set(reindexed);
  }
 
  onSave(): void {
    this.save.emit(this.sortedList());
  }
 
  onDismiss(): void {
    this.dismiss.emit();
  }
 
  isSlotActive(afterOrder: number | null): boolean {
    const active = this.activeInsertAfterOrder();
    return active === afterOrder;
  }
  
  private toApiName(label: string): string {
    return label
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }
 
  darken(hex: string): string {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (n >> 16) - 60);
    const g = Math.max(0, ((n >> 8) & 0xff) - 60);
    const b = Math.max(0, (n & 0xff) - 60);
    return `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
 
  trackById(_: number, s: TaskStatusData): string {
    return s.taskStatusId;
  }
}
