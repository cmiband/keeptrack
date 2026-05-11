import { Component, input, output } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListTask, TaskStatusData, GroupedTasks, TaskUpdateEvent } from '../constants';

@Component({
  selector: 'app-kanban-view',
  imports: [DragDropModule],
  templateUrl: './kanban-view.html',
  styleUrl: './kanban-view.css',
})
export class KanbanView {

  tasksChange = output<GroupedTasks>();
  singleTaskUpdate = output<TaskUpdateEvent>();

  tasksByStatus = input<GroupedTasks>({});
  statuses = input<TaskStatusData[]>([]);

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
}
