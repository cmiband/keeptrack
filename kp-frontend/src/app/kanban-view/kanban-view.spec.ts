import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanView } from './kanban-view';

describe('KanbanView', () => {
  let component: KanbanView;
  let fixture: ComponentFixture<KanbanView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanView],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
