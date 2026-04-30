package com.sggw.kp_backend.taskstatus;

import org.springframework.stereotype.Component;

@Component
public class TaskStatusMapper {
    public TaskStatusDto toDto(TaskStatus taskStatus) {
        if (taskStatus == null) return null;

        return TaskStatusDto.builder()
                .taskStatusId(taskStatus.getTaskStatusId())
                .statusName(taskStatus.getStatusName())
                .statusLabel(taskStatus.getStatusLabel())
                .build();
    }
}
