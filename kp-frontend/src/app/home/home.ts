import { Component, inject, signal, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { TaskList } from '../task-list/task-list';
import { KanbanView } from '../kanban-view/kanban-view';
import { API_ENDPOINT, BoardData, DEFAULT_USER, UserData, OpenedBoard, TaskData, TaskStatusData, UsersWithTaskId, GroupedTasks, ListTask, Assignee, ListUser, TaskUpdateEvent } from '../constants';
import { AddTask } from '../add-task/add-task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KanbanView, TaskList, AddTask],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  userData: UserData = DEFAULT_USER;
  activebutton: string = 'list';

  httpClient = inject(HttpClient);

  tasksByStatus = signal<GroupedTasks>({});
  statuses = signal<TaskStatusData[]>([]);

  currentBoard = signal<OpenedBoard | undefined>(undefined);

  boards = signal<[string, string, string][]>([]);
  rawBoards: BoardData[] = [];
  tasks: TaskData[] = [];
  usersByTasks: UsersWithTaskId[] = [];
  openedBoard: OpenedBoard | undefined;

  users = signal<ListUser[]>([]);

  currentUser = ['', ''];

  directMeesageExpand: boolean = true;
  dataLoaded = signal<boolean>(false);

  notification = signal<string | null>(null);
  isAddTaskMenuOpen: boolean = false;
  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    const savedData = localStorage.getItem('user');
    if(!savedData) {
      return;
    }

    this.retrieveData(savedData);
  }

  async retrieveData(savedData: string) {
    this.userData = JSON.parse(savedData) as UserData;
    this.fillUserInfo(this.userData);

    await this.retrieveBoards(this.userData.id);
    if(!this.boards().length) {
      return;
    }
    this.openedBoard = {id: this.boards()[0][0], boardName: this.boards()[0][1]};
    this.currentBoard.set(this.openedBoard);

    await this.retrieveTasks(this.openedBoard.id);
    await this.retrieveUsers(this.openedBoard.id);
    await this.retrieveStatuses(this.openedBoard.id);
    await this.retrieveUsersByTasks();

    this.groupTasksByStatus();

    this.dataLoaded.set(true);
  }

  async retrieveBoards(userId: string) {
    const boardData = await firstValueFrom(this.httpClient.get<BoardData[]>(`${API_ENDPOINT}/users/${userId}/boards`));

    this.rawBoards = boardData;
    this.boards.set(boardData.map((board) => ([board.boardId, board.boardName, this.randomColor()])));
  }

  get isCurrentUserBoardAuthor(): boolean {
    if (!this.openedBoard || !this.rawBoards.length) return false;
    const board = this.rawBoards.find(b => b.boardId === this.openedBoard!.id);
    return board?.authorId === this.userData.id;
  }

  async retrieveTasks(boardId: string) {
    const tasks = await firstValueFrom(this.httpClient.get<TaskData[]>(`${API_ENDPOINT}/board/${boardId}/tasks`));

    this.tasks = tasks;
  }

  async retrieveStatuses(boardId: string) {
    const statuses = await firstValueFrom(this.httpClient.get<TaskStatusData[]>(`${API_ENDPOINT}/task-status/board/${boardId}`));

    this.statuses.set(statuses);
  }

  async retrieveUsersByTasks() {
    const taskIds = this.tasks.map((task) => task.taskId);
    const usersByTasks = await firstValueFrom(this.httpClient.post<any>(`${API_ENDPOINT}/task/users/by-task-ids`, {taskIds: taskIds}));

    this.usersByTasks = usersByTasks;
  }

  async retrieveUsers(boardId: string) {
    const users = await firstValueFrom(this.httpClient.get<UserData[]>(`${API_ENDPOINT}/board/${boardId}/users`));

    this.users.set(users.map((user) => ({id: user.id, firstName: user.firstName, lastName: user.lastName, color: this.randomColor()})));
  }

  groupTasksByStatus() {
    this.statuses().forEach((status) => {
      this.tasksByStatus()[status.statusName] = [];
    });

    this.tasks.forEach((task) => {
      const status = this.statuses().find((status) => status.taskStatusId == task.statusId);
      if(!status) {
        return;
      }

      const listTask: ListTask = {
       id: task.taskId,
       title: task.taskName,
       description: task.description,
        assignees: this.composeAssignees(task),
        dueText: this.composeDueText(task),
        isOverdue: this.checkIfTaskIsOverdue(task)
      }

      this.tasksByStatus()[status.statusName].push(listTask);
    });
  }

  composeAssignees(task: TaskData): Assignee[] {
    const usersWithTaskId = this.usersByTasks.find((ubt) => ubt.taskId == task.taskId);
    if(!usersWithTaskId) {
      return [];
    }

    const result: Assignee[] = [];
    usersWithTaskId.users.forEach((user) => {
      const initials = user.firstName[0]+user.lastName[0];
      const listUser = this.users().find((lu) => lu.id == user.id);
      let color = "";
      if(!listUser) {
        color = "#FFFFFF";
      } else {
        color = listUser.color;
      }

      result.push({
        initials: initials,
        color: color
      });
    })

    return result;
  }

  composeDueText(task: TaskData) {
    const dueDate = new Date(task.targetDate);

    return this.daysUntil(dueDate);
  }

  daysUntil(date: Date): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffMs = target.getTime() - today.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days === 0) return "0 days";
    if (days === 1) return "1 day";
    if (days === -1) return "1 day ago";
    if (days < 0) return `${Math.abs(days)} days ago`;
    return `${days} days`;
  }

  checkIfTaskIsOverdue(task: TaskData) {
    const dueDate = new Date(task.targetDate);

    return dueDate < new Date();
  }

  async updateTask(task: TaskData) {
    await firstValueFrom(this.httpClient.put(`${API_ENDPOINT}/task/${task.taskId}`, task));
  }

  fillUserInfo(userData: UserData) {
    this.currentUser[0] = userData.firstName;
    this.currentUser[1] = userData.lastName;
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleClick(name: string) {
    this.activebutton = name;
  }

  handleTaskListUpdate(groupedTasks: GroupedTasks) {
    this.tasksByStatus.set(groupedTasks);
  }

  handleTaskUpdate(taskEvent: TaskUpdateEvent) {
    const taskData = this.tasks.find((taskData) => taskData.taskId == taskEvent.task.id);
    if(!taskData) {
      return;
    }

    taskData.statusId = taskEvent.newStatusId;
    this.updateTask(taskData);
  }

  async removeUserFromBoard(userId: string) {
    if (!this.openedBoard) return;
    const user = this.users().find(u => u.id === userId);
    await firstValueFrom(this.httpClient.delete(`${API_ENDPOINT}/board-assignment/board/${this.openedBoard.id}/user/${userId}`));
    this.users.set(this.users().filter(u => u.id !== userId));

    if (user) {
      this.notification.set(`${user.firstName} ${user.lastName} was removed from ${this.openedBoard.boardName}`);
      setTimeout(() => this.notification.set(null), 3000);
    }
  }

  toggleDirectMessages() {
    this.directMeesageExpand = !this.directMeesageExpand;
  }

  randomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  openAddTaskMenu() {
    this.isAddTaskMenuOpen = true;
  }

  closeAddTaskMenu() {
    this.isAddTaskMenuOpen = false;
  }
}
