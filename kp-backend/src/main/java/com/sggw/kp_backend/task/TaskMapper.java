package com.sggw.kp_backend.task;

import org.springframework.stereotype.Component;

@Component
public class TaskMapper {
    public TaskDto taskToTaskDto (Task task) {
        if (task == null) return null;

        return TaskDto.builder()
                .taskId(task.getTaskId())
                .taskName(task.getTaskName())
                .authorId(task.getAuthorId())
                .description(task.getDescription())
                .createdDate(task.getCreatedDate())
                .targetDate(task.getTargetDate())
                .boardId(task.getBoardId())
                .build();
    }
}
