import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { API_ENDPOINT, ListUser, UserData } from '../constants';

@Component({
  selector: 'app-create-workspace',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-workspace.html',
  styleUrl: './create-workspace.css',
})
export class CreateWorkspace {
  @Input() currentUser!: UserData;
  @Output() close = new EventEmitter<void>();
  @Output() boardCreated = new EventEmitter<string>();

  private http = inject(HttpClient);

  boardName: string = '';
  emailInput: string = '';
  emailError: string = '';
  isLoading: boolean = false;
  suggestions: UserData[] = [];
  showSuggestions: boolean = false;

  private searchSubject = new Subject<string>();

  addedUsers: (ListUser & { email: string })[] = [];

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(email => {
        if (email.length < 2) return of([]);
        return this.http.get<UserData[]>(
          `${API_ENDPOINT}/users/search?email=${encodeURIComponent(email)}`
        ).pipe(catchError(() => of([])));
      })
    ).subscribe(users => {
      this.suggestions = users.filter(u =>
        u.id !== this.currentUser.id &&
        !this.addedUsers.some(a => a.id === u.id)
      );
      this.showSuggestions = this.suggestions.length > 0;
    });
  }

  onEmailInput() {
    this.emailError = '';
    this.searchSubject.next(this.emailInput.trim());
  }

  selectSuggestion(user: UserData) {
    this.addedUsers.push({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      color: this.randomColor(),
    });
    this.emailInput = '';
    this.suggestions = [];
    this.showSuggestions = false;
  }

  hideSuggestions() {
    setTimeout(() => { this.showSuggestions = false; }, 150);
  }

  removeUser(userId: string) {
    this.addedUsers = this.addedUsers.filter(u => u.id !== userId);
  }

  async onCreate() {
    if (!this.boardName.trim()) {
      this.emailError = 'Please enter a workspace name.';
      return;
    }

    this.isLoading = true;
    try {
      const board = await firstValueFrom(
        this.http.post<any>(`${API_ENDPOINT}/board/create`, {
          boardName: this.boardName.trim(),
          authorId: this.currentUser.id,
        })
      );
      console.log('board response:', board);
      const boardId = board.boardId ?? board.id;

      await firstValueFrom(
        this.http.post(`${API_ENDPOINT}/board-assignment/create`, {
          boardId: boardId,
          userId: this.currentUser.id,
        })
      );

      for (const user of this.addedUsers) {
        await firstValueFrom(
          this.http.post(`${API_ENDPOINT}/board-assignment/create`, {
            boardId: boardId,
            userId: user.id,
          })
        );
      }

      this.boardCreated.emit(boardId);
      this.close.emit();
    } catch (e) {
      console.error(e);
      this.emailError = 'Something went wrong. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }

  private randomColor(): string {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}