package com.sggw.kp_backend.taskassignment;

import org.springframework.stereotype.Component;

@Component
public class TaskAssignmentMapper {
    public TaskAssignmentDto toDto(TaskAssignment taskAssignment) {
        if (taskAssignment == null) return null;

        return TaskAssignmentDto.builder()
                .taskAssignmentId(taskAssignment.getTaskAssignmentId())
                .taskId(taskAssignment.getTaskId())
                .userId(taskAssignment.getUserId())
                .build();
    }
}
