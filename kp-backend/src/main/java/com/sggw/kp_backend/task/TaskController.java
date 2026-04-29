package com.sggw.kp_backend.task;

import com.sggw.kp_backend.user.UpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final TaskMapper taskMapper;

    @GetMapping
    public List<TaskDto> getAllTasks() {
        return taskService.getAllTasks().stream()
                .map(taskMapper::taskToTaskDto)
                .toList();
    }

    @GetMapping("/{id}")
    public TaskDto getTaskById(@PathVariable int id) {
        return taskMapper.taskToTaskDto(taskService.getTaskById(id));
    }

    @PostMapping("/create")
    public Task createTask(@Valid @RequestBody TaskCreateRequest request) {
        return taskService.createTask(request);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable int taskId) {
        taskService.deleteTask(taskId);
    }

    @PutMapping("/{taskId}")
    public void updateTask(@PathVariable int taskId, @Valid @RequestBody TaskUpdateRequest request) {
        taskService.updateTask(taskId, request);
    }

}
