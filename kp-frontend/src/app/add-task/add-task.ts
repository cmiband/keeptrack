import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { API_ENDPOINT, ListUser, TaskAssignment, TaskAssignmentResponse, TaskData, TaskStatusData, UserData } from '../constants';
import { firstValueFrom, retry } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-add-task',
  imports: [],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  @Input() boardID: string | undefined = undefined;
  @Input() users: ListUser[] | null = null;
  @Input() currentUser: UserData | null = null;
  @Input() statuses: TaskStatusData[] | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<void>();

  assignedUsers: number[] = []

  todayDate: string = new Date().toISOString().split('T')[0];
  validationError: string = '';
  httpClient = inject(HttpClient);

  onClose() {
    this.close.emit();
    this.assignedUsers = [];
  }

  addRemoveUser(userID: string | undefined) {
    if(userID === undefined) return;

    const id = Number(userID);
    const find = this.assignedUsers.indexOf(id);

    if (find === -1) {
      this.assignedUsers = [...this.assignedUsers, id];
    }
    else {
      this.assignedUsers = this.assignedUsers.filter(item => item !== id);
    }
  }

  createTask(name: string, description: string, time: string, date: string) {
    this.validationError = '';

    const statusID = this.findStatusId();

    const validationStatus = this.validation(name, date, Number(this.currentUser?.id), Number(this.boardID), Number(statusID));

    if (!validationStatus) {
      return;
    }

    const newTask = {
      taskName: name,
      authorId: Number(this.currentUser?.id),
      description: description,
      targetDate: date,
      boardId: Number(this.boardID),
      statusId: Number(statusID)
    };

    this.createTaskDB(newTask);
  }

  validation(name: string, date: string, authorID: number, boardID: number, statusID: number) {
    if (name.length <= 0) {
      this.validationError = 'Task name requires at least one character';
      return false;
    }
    else if (date.length <= 0) {
      this.validationError = 'A due date must be selected';
      return false;
    }
    else if(date < this.todayDate) {
      this.validationError = 'The date must be at least today';
      return false;
    }
    else if (date.split('-')[0].length > 4) {
      this.validationError = 'Invalid date format';
      return false;
    }
    else if (authorID === null || boardID === null || statusID === -1) {
      this.validationError = 'Unexpected error';
      return false;
    }
    else {
      return true;
    }
  }

  findStatusId() {
    const todoStatus = this.statuses?.find(status => status.statusName === 'todo');

    if (todoStatus) {
      const taskStatusId = todoStatus.taskStatusId;
      return taskStatusId;
    } else {
      return -1;
    }
  }

  async createTaskDB(newTask: {}) {
    const response = await firstValueFrom(this.httpClient.post<TaskData>(`${API_ENDPOINT}/task/create`, newTask));
    
    const newTaskId = response.taskId;

    for(const userId of this.assignedUsers) {
      const assignment: TaskAssignment = {taskId: Number(newTaskId), userId: userId};
      await this.assignUser(assignment);
    }
    
    this.taskAdded.emit();
  }

  async assignUser(assignment: TaskAssignment) {
    const response = await firstValueFrom(this.httpClient.post<TaskAssignmentResponse>(`${API_ENDPOINT}/task-assignment/create`, assignment));
  }
}
