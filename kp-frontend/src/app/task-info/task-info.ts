import { Component, EventEmitter, Output, Input, inject, ChangeDetectorRef } from '@angular/core';
import { API_ENDPOINT, Assignee, TaskData } from '../constants';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from 'rxjs';
import { formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

interface TaskCommentDto {
  taskCommentId: number;
  authorId: number;
  createdDate: string;
  commentBody: string;
  taskId: number;
}

@Component({
  selector: 'app-task-info',
  imports: [FormsModule], 
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
  

  comments: TaskCommentDto[] = [];

  newCommentText: string = '';

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
    this.getTaskInfo(this.taskID);
    if (this.taskID) {
      this.getComments(this.taskID);
    }
  }

  async getTaskInfo(taskID: string| null) {
    const taskInfo = await firstValueFrom(this.httpClient.get<TaskData>(`${API_ENDPOINT}/task/${taskID}`));
    this.task = taskInfo;
    this.formattedDate = formatDate(this.task.targetDate, 'EEEE, MMMM d', 'en-US');
    this.cdr.detectChanges();
  }

  async getComments(taskID: string) {
    try {
      const fetchedComments = await firstValueFrom(
        this.httpClient.get<TaskCommentDto[]>(`${API_ENDPOINT}/task-comment/task/${taskID}`)
      );
      this.comments = fetchedComments;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Błąd podczas pobierania komentarzy:', error);
    }
  }

  async addComment() {
    if (!this.newCommentText.trim() || !this.taskID) {
      return;
    }

    const storedUser = localStorage.getItem('currentUser'); 
    let currentUserId = 1; 

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      currentUserId = parsedUser.id || 1;
    }

    const body = {
      authorId: currentUserId,
      commentBody: this.newCommentText,
      taskId: parseInt(this.taskID)
    };

    try {
      const savedComment = await firstValueFrom(
        this.httpClient.post<TaskCommentDto>(`${API_ENDPOINT}/task-comment/create`, body)
      );
      
      this.comments.push(savedComment);
      
      this.newCommentText = '';
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Błąd podczas dodawania komentarza:', error);
    }
  }
}