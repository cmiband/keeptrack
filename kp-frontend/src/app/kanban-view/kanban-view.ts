import { Component, input } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListTask, ListStatus } from '../constants';

@Component({
  selector: 'app-kanban-view',
  imports: [DragDropModule],
  templateUrl: './kanban-view.html',
  styleUrl: './kanban-view.css',
})
export class KanbanView {


  tasksByStatus: { [key: string]: ListTask[] } = {
      'todo': [
        { id: '1', title: 'trochę przygrzać', assignees: [{ initials: 'WF', color: '#99E98F' }], dueText: '4 days' },
        { id: '2', title: 'melanż w resecie', assignees: [{ initials: 'IK', color: '#E99B8F' }], dueText: '6 days' },
        { id: '3', title: 'speed-dating', assignees: [{ initials: 'SG', color: '#5CD27D' }], dueText: '1 day ago', isOverdue: true },
        { id: '4', title: 'obrót', assignees: [{ initials: 'IK', color: '#E99B8F' }], dueText: '2 hours' }
      ],
      'in_progress': [
        { id: '5', title: 'kotłownia', assignees: [{ initials: 'IK', color: '#E99B8F' }], dueText: '1 day' },
        {
          id: '6', title: 'karaoke shamrock', assignees: [
            { initials: 'IK', color: '#E99B8F' }, { initials: 'BA', color: '#D37EF1' },
            { initials: 'IC', color: '#83E5F4' }, { initials: 'DO', color: '#F4ED83' }
          ], dueText: '6 days'
        }
      ]
  };

  statuses : ListStatus[] = [
    {label: 'TODO', name: "todo", color: "#dbdbdb"},
    {label: 'In Progress', name: "in_progress", color: "#ff4f8d"}
  ];

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
  }
}
