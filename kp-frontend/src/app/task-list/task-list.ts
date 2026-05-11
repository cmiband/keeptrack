import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GroupedTasks, ListTask, TaskStatusData, TaskUpdateEvent } from '../constants';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  collapsedSections: { [key: string]: boolean } = {};

  tasksChange = output<GroupedTasks>();
  singleTaskUpdate = output<TaskUpdateEvent>();

  tasksByStatus = input<GroupedTasks>({});
  statuses = input<TaskStatusData[]>([]);

  ngOnInit() {
    this.statuses().forEach((status) => {
      this.collapsedSections[status.statusName] = false;
    })
  }

  toggleSection(status: string) {
    this.collapsedSections[status] = !this.collapsedSections[status];
  }

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
