import { Component, inject, signal, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { TaskList } from '../task-list/task-list';
import { KanbanView } from '../kanban-view/kanban-view';
import { API_ENDPOINT, BoardData, DEFAULT_USER, UserData, OpenedBoard, TaskData, TaskStatusData, UsersWithTaskId, GroupedTasks, ListTask, Assignee, ListUser, TaskUpdateEvent } from '../constants';
import { AddTask } from '../add-task/add-task';
import { CreateWorkspace } from '../create-workspace/create-workspace';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KanbanView, TaskList, AddTask, CreateWorkspace],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @ViewChild('filters') filtersList !: ElementRef;

  userData: UserData = DEFAULT_USER;
  activebutton: string = 'list';

  httpClient = inject(HttpClient);

  tasksByStatus = signal<GroupedTasks>({});
  statuses = signal<TaskStatusData[]>([]);
  filteredStatuses = signal<TaskStatusData[]>([]);

  currentBoard = signal<OpenedBoard | undefined>(undefined);

  boards = signal<[string, string, string][]>([]);
  rawBoards: BoardData[] = [];
  tasks: TaskData[] = [];
  usersByTasks: UsersWithTaskId[] = [];
  openedBoard: OpenedBoard | undefined;
  isCreateWorkspaceOpen: boolean = false;
  filtersOpened: boolean = false;
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
    await this.loadBoard(this.boards()[0][0], this.boards()[0][1]);
    this.dataLoaded.set(true);
  }

  async loadBoard(boardId: string, boardName: string) {
    this.openedBoard = {id: boardId, boardName: boardName};
    this.currentBoard.set(this.openedBoard);

    this.tasksByStatus.set({});

    await this.retrieveTasks(boardId);
    await this.retrieveUsers(boardId);
    await this.retrieveStatuses(boardId);
    await this.retrieveUsersByTasks();

    this.groupTasksByStatus();
  }

  async refreshCurrentBoard() {
    if (!this.openedBoard) return;
    await this.loadBoard(this.openedBoard.id, this.openedBoard.boardName);
  }

  async selectBoard(boardId: string, boardName: string) {
    if (this.openedBoard?.id === boardId) {
      return;
    }
    await this.loadBoard(boardId, boardName);
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
    this.filteredStatuses.set(statuses);
  }

  async retrieveUsersByTasks() {
    const taskIds = this.tasks.map((task) => task.taskId);
    if (!taskIds || taskIds.length === 0) {
      this.usersByTasks = [];
      return;
    }
    const usersByTasks = await firstValueFrom(this.httpClient.post<any>(`${API_ENDPOINT}/task/users/by-task-ids`, {taskIds: taskIds}));

    this.usersByTasks = usersByTasks;
  }

  async retrieveUsers(boardId: string) {
    const users = await firstValueFrom(this.httpClient.get<UserData[]>(`${API_ENDPOINT}/board/${boardId}/users`));

    this.users.set(users.map((user) => ({id: user.id, firstName: user.firstName, lastName: user.lastName, color: this.randomColor()})));
  }

  groupTasksByStatus() {
    const grouped: GroupedTasks = {};
    this.statuses().forEach((status) => {
      grouped[status.statusName] = [];
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

      grouped[status.statusName].push(listTask);
    });

    this.tasksByStatus.set(grouped);
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

  openCreateWorkspace() {
    this.isCreateWorkspaceOpen = true;
  }

  openFilters(event: MouseEvent) {
    this.filtersOpened = !this.filtersOpened;

    setTimeout(() => {
      if(!this.filtersList) {
        return;
      }

      this.filtersList.nativeElement.style.display = this.filtersOpened ? '' : 'none';
      this.filtersList.nativeElement.style.top = (event.clientY+20).toString()+'px';
      this.filtersList.nativeElement.style.left = event.clientX.toString()+'px';
    }, 15);
  }

  handleStatusFilter(event: MouseEvent) {
    const eventTarget = event.target as HTMLInputElement;
    const statusId = eventTarget.dataset['status'];
    if(!statusId) {
      return;
    }
    const status = this.statuses().find((status) => Number(status.taskStatusId) === Number(statusId));
    
    if(!status) {
      return;
    }

    const showStatus = eventTarget.checked;
    const filteredStatuses = this.filteredStatuses();
    if(showStatus) {
      filteredStatuses.push(status);
      filteredStatuses.sort((a,b) => a.statusOrder-b.statusOrder);

      this.filteredStatuses.set(filteredStatuses);
    } else {
      this.filteredStatuses.set(filteredStatuses.filter((status) => status.taskStatusId != statusId));
    }
  }

  closeCreateWorkspace() {
    this.isCreateWorkspaceOpen = false;
  }

  checkIfStatusIsSelected(statusId: string): boolean {
    return !!this.filteredStatuses().find((status) => status.taskStatusId===statusId);
  }

  async onBoardCreated(newBoardId?: string) {
    await this.retrieveBoards(this.userData.id);
    if (newBoardId) {
      const created = this.boards().find(b => b[0] === newBoardId);
      if (created) {
        await this.loadBoard(created[0], created[1]);
        this.dataLoaded.set(true);
      }
    }
    this.notification.set('Workspace created!');
    setTimeout(() => this.notification.set(null), 3000);
  }
}
