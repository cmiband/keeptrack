import { Component, inject, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { TaskList } from '../task-list/task-list';
import { KanbanView } from '../kanban-view/kanban-view';
import { API_ENDPOINT, BoardData, DEFAULT_USER, UserData, OpenedBoard, TaskData } from '../constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KanbanView, TaskList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {  
  userData: UserData = DEFAULT_USER;
  activebutton: string = 'list';

  httpClient = inject(HttpClient);

  boards = signal<[string, string, string][]>([]);
  openedBoard: OpenedBoard | undefined;

  users: [string, string, string][] = [
    ['Barosz', 'Adamowicz', '#D37EF1'],
    ['Witold', 'Filipek', '#99E98F'],
    ['Igor', 'Kucharski', '#E99B8F'],
    ['Igor', 'Czarnogłowski', '#83E5F4'],
    ['Albert', 'Gmitrzak', '#F48385'],
    ['Daniel', 'Gwozdecki', '#F4ED83']
  ];

  currentUser = ['', ''];

  directMeesageExpand: boolean = true;

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
    console.log(this.userData);

    await this.retrieveBoards(this.userData.id);
    if(!this.boards().length) {
      return;
    }
    this.openedBoard = {id: this.boards()[0][0], boardName: this.boards()[0][1]};

    await this.retrieveTasks(this.openedBoard.id);
    await this.retrieveUsers(this.openedBoard.id);
  }

  async retrieveBoards(userId: string) {
    const boardData = await firstValueFrom(this.httpClient.get<BoardData[]>(`${API_ENDPOINT}/users/${userId}/boards`));

    this.boards.set(boardData.map((board) => ([board.boardId, board.boardName, this.randomColor()])));
  }

  async retrieveTasks(boardId: string) {
    const tasks = await firstValueFrom(this.httpClient.get<TaskData[]>(`${API_ENDPOINT}/board/${boardId}/tasks`));

    console.log(tasks);
  }

  async retrieveUsers(boardId: string) {
    const users = await firstValueFrom(this.httpClient.get<UserData[]>(`${API_ENDPOINT}/board/${boardId}/users`));

    console.log(users);
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

  toggleDirectMessages() {
    this.directMeesageExpand = !this.directMeesageExpand;
  }

  randomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
}
