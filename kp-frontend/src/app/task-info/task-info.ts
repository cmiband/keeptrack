import { Component, EventEmitter, Output, Input, inject, ChangeDetectorRef } from '@angular/core';
import { API_ENDPOINT, Assignee, TaskData, TaskStatusData } from '../constants';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from 'rxjs';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-task-info',
  imports: [],
  templateUrl: './task-info.html',
  styleUrl: './task-info.css',
})
export class TaskInfo {
  @Input() taskID: string | null = null;
  @Input() statusLabel: string | null = null;
  @Input() statusColor: string | null = null;
  @Input() boardName: string | undefined = undefined;
  @Input() assignees: Assignee[] | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  httpClient = inject(HttpClient);
  task: TaskData | null = null;
  formattedDate = '';
  
  onClose() {
    this.close.emit();
  }

  ngOnInit() {
    this.getTaskInfo(this.taskID);
  }

  async getTaskInfo(taskID: string| null) {
    const taskInfo = await firstValueFrom(this.httpClient.get<TaskData>(`${API_ENDPOINT}/task/${taskID}`));
    this.task = taskInfo;
    this.formattedDate = formatDate(this.task.targetDate,'EEEE, MMMM d','en-US');

    this.cdr.detectChanges();
  }
}
