package com.sggw.kp_backend.taskstatus;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task-status")
@RequiredArgsConstructor
public class TaskStatusController {
    private final TaskStatusService taskStatusService;
    private final TaskStatusMapper taskStatusMapper;

    @GetMapping
    public List<TaskStatusDto> getAllTaskStatuses() {
        return taskStatusService.getAllTaskStatuses().stream()
                .map(taskStatusMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public TaskStatusDto getTaskStatusById(@PathVariable int id) {
        return taskStatusMapper.toDto(taskStatusService.getTaskStatusById(id));
    }

    @PostMapping("/create")
    public TaskStatus createTaskStatus(@Valid @RequestBody TaskStatusCreateRequest request) {
        return taskStatusService.createTaskStatus(request);
    }

    @DeleteMapping("/{id}")
    public void deleteTaskStatus(@PathVariable int id) {
        taskStatusService.deleteTaskStatus(id);
    }

    @PutMapping("/{id}")
    public void updateTaskStatus(@PathVariable int id, @Valid @RequestBody TaskStatusUpdateRequest request) {
        taskStatusService.updateTaskStatus(id, request);
    }
}
