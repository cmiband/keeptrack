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
    targetDate: string,
    boardId: string,
    statusId: string
}

export interface TaskStatusData {
    taskStatusId: string,
    statusName: string,
    statusLabel: string,
    statusColor: string,
    statusOrder: number,
    boardId: string
}

export interface TaskAssignment {
    taskId: number,
    userId: number
}

export interface TaskAssignmentResponse {
    taskAssignmentId: string,
    taskId: string,
    userId: string
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
  description: string;
  assignees: Assignee[];
  dueText: string;
  isOverdue?: boolean;
}

export interface UsersWithTaskId {
    taskId: string,
    users: UserData[]
}

export interface ListStatus {
    label: string,
    name: string,
    color: string
}

export interface GroupedTasks {
    [key: string]: ListTask[]
}

export interface ListUser {
    id: string
    firstName: string,
    lastName: string,
    color: string
}

export interface TaskUpdateEvent {
    newStatusId: string,
    task: ListTask
}