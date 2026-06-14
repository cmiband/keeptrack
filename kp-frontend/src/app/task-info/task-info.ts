import { Component, EventEmitter, Output, Input, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { API_ENDPOINT, Assignee, TaskData, UserData } from '../constants';
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

interface CommentAuthor {
  firstName: string;
  lastName: string;
  initials: string;
  color: string;
}

@Component({
  selector: 'app-task-info',
  imports: [FormsModule],
  templateUrl: './task-info.html',
  styleUrl: './task-info.css',
})
export class TaskInfo implements OnInit {
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
  newCommentText = '';

  private boardUsers = new Map<string, CommentAuthor>();
  private readonly avatarColors = ['#e8a0a0', '#a0c4e8', '#a0e8b4', '#e8d4a0', '#c4a0e8', '#e8a0d4'];

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
    void this.init();
  }

  private async init() {
    if (!this.taskID) {
      return;
    }
    await this.getTaskInfo(this.taskID);
    await this.getComments(this.taskID);
  }

  async getTaskInfo(taskID: string | null) {
    const taskInfo = await firstValueFrom(this.httpClient.get<TaskData>(`${API_ENDPOINT}/task/${taskID}`));
    this.task = taskInfo;
    this.formattedDate = formatDate(this.task.targetDate, 'EEEE, MMMM d', 'en-US');
    await this.loadBoardUsers(this.task.boardId);
    this.cdr.detectChanges();
  }

  async loadBoardUsers(boardId: string) {
    try {
      const users = await firstValueFrom(
        this.httpClient.get<UserData[]>(`${API_ENDPOINT}/board/${boardId}/users`)
      );
      this.boardUsers.clear();
      users.forEach((user) => {
        const userId = String(user.id);
        this.boardUsers.set(userId, {
          firstName: user.firstName,
          lastName: user.lastName,
          initials: `${user.firstName[0]}${user.lastName[0]}`.toUpperCase(),
          color: this.colorFromId(userId),
        });
      });
    } catch (error) {
      console.error('Błąd podczas pobierania użytkowników:', error);
    }
  }

  async getComments(taskID: string) {
    try {
      const fetchedComments = await firstValueFrom(
        this.httpClient.get<TaskCommentDto[]>(`${API_ENDPOINT}/task-comment/task/${taskID}`)
      );
      this.comments = this.sortComments(fetchedComments);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Błąd podczas pobierania komentarzy:', error);
    }
  }

  async addComment() {
    const trimmedText = this.newCommentText.trim();
    if (!trimmedText || !this.taskID) {
      return;
    }

    const storedUser = localStorage.getItem('user');
    let currentUserId = 1;

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as UserData;
      currentUserId = parseInt(parsedUser.id, 10) || 1;
    }

    const body = {
      authorId: currentUserId,
      commentBody: trimmedText,
      taskId: parseInt(this.taskID, 10),
    };

    try {
      const savedComment = await firstValueFrom(
        this.httpClient.post<TaskCommentDto>(`${API_ENDPOINT}/task-comment/create`, body)
      );

      this.comments = this.sortComments([...this.comments, savedComment]);
      this.newCommentText = '';
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Błąd podczas dodawania komentarza:', error);
    }
  }

  getAuthor(authorId: number): CommentAuthor {
    const user = this.boardUsers.get(String(authorId));
    if (user) {
      return user;
    }
    return {
      firstName: 'Unknown',
      lastName: 'User',
      initials: '?',
      color: '#d3d3d3',
    };
  }

  formatCommentTime(dateStr: string): string {
    return formatDate(dateStr, 'MMM d', 'en-US');
  }

  private sortComments(comments: TaskCommentDto[]): TaskCommentDto[] {
    return [...comments].sort(
      (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    );
  }

  private colorFromId(id: string): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.avatarColors[Math.abs(hash) % this.avatarColors.length];
  }
}
