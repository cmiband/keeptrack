package com.sggw.kp_backend.task;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public Task getTaskById(int taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task with id: " + taskId + " was not found"));
        return task;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(TaskCreateRequest request) {
        Task task = new Task(null, request.getTaskName(), request.getAuthorId(),
                request.getDescription(), LocalDate.now(),request.getTargetDate(), request.getBoardId());
        taskRepository.save(task);
        return task;
    }

    public void deleteTask(int taskId) {
        Task task = getTaskById(taskId);
        taskRepository.delete(task);
    }

    public void updateTask(int taskId, TaskUpdateRequest request) {
        Task task = getTaskById(taskId);
        task.setTaskName(request.getTaskName());
        task.setDescription(request.getDescription());
        task.setTargetDate(request.getTargetDate());
        task.setBoardId(request.getBoardId());
        taskRepository.save(task);
    }

}
