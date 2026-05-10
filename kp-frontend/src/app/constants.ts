export const API_ENDPOINT = "http://localhost:8080";

export interface UserData {
    createdDate: string,
    email: string,
    firstName: string,
    id: string,
    lastName: string,
    username: string
};

export interface BoardData {
    boardName: string,
    authorId: string,
    boardId: string
}

export interface OpenedBoard {
    id: string,
    boardName: string
}

export interface TaskData {
    taskId: string,
    taskName: string,
    authorId: string,
    description: string,
    createdDate: string,
    targetData: string,
    boardId: string
}

export const DEFAULT_USER: UserData = {
  createdDate: "",
  email: "",
  firstName: "",
  id: "",
  lastName: "",
  username: ""
};

export interface Assignee {
  initials: string;
  color: string;
}

export interface ListTask {
  id: string;
  title: string;
  assignees: Assignee[];
  dueText: string;
  isOverdue?: boolean;
}

export interface ListStatus {
    label: string,
    name: string,
    color: string
}