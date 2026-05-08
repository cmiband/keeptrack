import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Assignee {
  initials: string;
  color: string;
}

interface Task {
  id: string;
  title: string;
  assignees: Assignee[];
  dueText: string;
  isOverdue?: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  collapsedSections: { [key: string]: boolean } = {
    'to do': false,
    'in progress': false
  };

  tasksByStatus: { [key: string]: Task[] } = {
    'to do': [
      { id: '1', title: 'trochę przygrzać', assignees: [{ initials: 'WF', color: '#99E98F' }], dueText: '4 days' },
      { id: '2', title: 'melanż w resecie', assignees: [{ initials: 'IK', color: '#E99B8F' }], dueText: '6 days' },
      { id: '3', title: 'speed-dating', assignees: [{ initials: 'SG', color: '#5CD27D' }], dueText: '1 day ago', isOverdue: true },
      { id: '4', title: 'obrót', assignees: [{ initials: 'IK', color: '#E99B8F' }], dueText: '2 hours' }
    ],
    'in progress': [
      { id: '5', title: 'kotłownia', assignees: [{ initials: 'IK', color: '#E99B8F' }], dueText: '1 day' },
      {
        id: '6', title: 'karaoke shamrock', assignees: [
          { initials: 'IK', color: '#E99B8F' }, { initials: 'BA', color: '#D37EF1' },
          { initials: 'IC', color: '#83E5F4' }, { initials: 'DO', color: '#F4ED83' }
        ], dueText: '6 days'
      }
    ]
  };


  statuses = ['to do', 'in progress'];

  toggleSection(status: string) {
    this.collapsedSections[status] = !this.collapsedSections[status];
  }

  drop(event: CdkDragDrop<Task[]>) {
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
  }
}
