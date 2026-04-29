package com.sggw.kp_backend.taskstatus;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskStatusService {
    private final TaskStatusRepository taskStatusRepository;

    public TaskStatus getTaskStatusById(int id) {
        return taskStatusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TaskStatus with id: " + id + " was not found"));
    }

    public List<TaskStatus> getAllTaskStatuses() {
        return taskStatusRepository.findAll();
    }

    public TaskStatus createTaskStatus(TaskStatusCreateRequest request) {
        TaskStatus taskStatus = new TaskStatus(null, request.getStatusName(), request.getStatusLabel());
        taskStatusRepository.save(taskStatus);
        return taskStatus;
    }

    public void deleteTaskStatus(int id) {
        TaskStatus taskStatus = getTaskStatusById(id);
        taskStatusRepository.delete(taskStatus);
    }

    public void updateTaskStatus(int id, TaskStatusUpdateRequest request) {
        TaskStatus taskStatus = getTaskStatusById(id);
        taskStatus.setStatusName(request.getStatusName());
        taskStatus.setStatusLabel(request.getStatusLabel());
        taskStatusRepository.save(taskStatus);
    }
}
