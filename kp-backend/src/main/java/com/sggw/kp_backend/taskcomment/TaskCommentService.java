package com.sggw.kp_backend.taskcomment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskCommentService {
    private final TaskCommentRepository taskCommentRepository;

    public TaskComment getTaskCommentById(int id) {
        return taskCommentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TaskComment with id: " + id + " was not found"));
    }

    public List<TaskComment> getAllTaskComments() {
        return taskCommentRepository.findAll();
    }

    public TaskComment createTaskComment(TaskCommentCreateRequest request) {
        TaskComment taskComment = new TaskComment(null, request.getAuthorId(),
                LocalDate.now(), request.getCommentBody(), request.getTaskId());
        taskCommentRepository.save(taskComment);
        return taskComment;
    }

    public void deleteTaskComment(int id) {
        TaskComment taskComment = getTaskCommentById(id);
        taskCommentRepository.delete(taskComment);
    }

    public void updateTaskComment(int id, TaskCommentUpdateRequest request) {
        TaskComment taskComment = getTaskCommentById(id);
        taskComment.setCommentBody(request.getCommentBody());
        taskCommentRepository.save(taskComment);
    }
}
