package com.sggw.kp_backend.taskassignment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskAssignmentService {
    private final TaskAssignmentRepository taskAssignmentRepository;

    public TaskAssignment getTaskAssignmentById(int id) {
        return taskAssignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TaskAssignment with id: " + id + " was not found"));
    }

    public List<TaskAssignment> getAllTaskAssignments() {
        return taskAssignmentRepository.findAll();
    }

    public TaskAssignment createTaskAssignment(TaskAssignmentCreateRequest request) {
        TaskAssignment taskAssignment = new TaskAssignment(null, request.getTaskId(), request.getUserId());
        taskAssignmentRepository.save(taskAssignment);
        return taskAssignment;
    }

    public void deleteTaskAssignment(int id) {
        TaskAssignment taskAssignment = getTaskAssignmentById(id);
        taskAssignmentRepository.delete(taskAssignment);
    }

    public void updateTaskAssignment(int id, TaskAssignmentUpdateRequest request) {
        TaskAssignment taskAssignment = getTaskAssignmentById(id);
        taskAssignment.setTaskId(request.getTaskId());
        taskAssignment.setUserId(request.getUserId());
        taskAssignmentRepository.save(taskAssignment);
    }
}
