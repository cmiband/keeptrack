import { Component, input, output } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListTask, TaskStatusData, GroupedTasks, TaskUpdateEvent, Assignee, OpenedBoard } from '../constants';
import { TaskInfo } from '../task-info/task-info';

@Component({
  selector: 'app-kanban-view',
  imports: [DragDropModule, TaskInfo],
  templateUrl: './kanban-view.html',
  styleUrl: './kanban-view.css',
})
export class KanbanView {

  tasksChange = output<GroupedTasks>();
  singleTaskUpdate = output<TaskUpdateEvent>();

  tasksByStatus = input<GroupedTasks>({});
  statuses = input<TaskStatusData[]>([]);

  currentBoard = input<OpenedBoard | undefined>(undefined);

  taskToShowInfo: string | null = null;
  taskToShowStatusColor: string | null = null;
  taskToShowStatusLabel: string | null = null;
  taskToShowAssignees: Assignee[] | null = null;

  drop(event: CdkDragDrop<ListTask[]>) {
    if (event.previousContainer === event.container) {
     
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
     
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    const updateEvent: TaskUpdateEvent = {
      newStatusId: event.container.element.nativeElement.dataset['status'] ?? "",
      task: event.item.data
    };
    this.singleTaskUpdate.emit(updateEvent);
    this.tasksChange.emit(this.tasksByStatus());
  }

    openTaskInfo(id: string, statusColor: string, statusLabel: string, assignees: Assignee[]) {
      this.taskToShowInfo = id;
      this.taskToShowStatusColor = statusColor;
      this.taskToShowStatusLabel = statusLabel;
      this.taskToShowAssignees = assignees;
    }
  
    closeTaskInfo() {
      this.taskToShowInfo = null;
      this.taskToShowStatusColor = null;
      this.taskToShowStatusLabel = null;
      this.taskToShowAssignees = null;
    }
}
