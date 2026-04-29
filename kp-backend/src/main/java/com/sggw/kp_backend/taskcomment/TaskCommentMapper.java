package com.sggw.kp_backend.taskcomment;

import org.springframework.stereotype.Component;

@Component
public class TaskCommentMapper {
    public TaskCommentDto toDto(TaskComment taskComment) {
        if (taskComment == null) return null;

        return TaskCommentDto.builder()
                .taskCommentId(taskComment.getTaskCommentId())
                .authorId(taskComment.getAuthorId())
                .createdDate(taskComment.getCreatedDate())
                .commentBody(taskComment.getCommentBody())
                .taskId(taskComment.getTaskId())
                .build();
    }
}
