package com.sggw.kp_backend.taskassignment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task-assignment")
@RequiredArgsConstructor
public class TaskAssignmentController {
    private final TaskAssignmentService taskAssignmentService;
    private final TaskAssignmentMapper taskAssignmentMapper;

    @GetMapping
    public List<TaskAssignmentDto> getAllTaskAssignments() {
        return taskAssignmentService.getAllTaskAssignments().stream()
                .map(taskAssignmentMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public TaskAssignmentDto getTaskAssignmentById(@PathVariable int id) {
        return taskAssignmentMapper.toDto(taskAssignmentService.getTaskAssignmentById(id));
    }

    @PostMapping("/create")
    public TaskAssignment createTaskAssignment(@Valid @RequestBody TaskAssignmentCreateRequest request) {
        return taskAssignmentService.createTaskAssignment(request);
    }

    @DeleteMapping("/{id}")
    public void deleteTaskAssignment(@PathVariable int id) {
        taskAssignmentService.deleteTaskAssignment(id);
    }

    @PutMapping("/{id}")
    public void updateTaskAssignment(@PathVariable int id, @Valid @RequestBody TaskAssignmentUpdateRequest request) {
        taskAssignmentService.updateTaskAssignment(id, request);
    }
}
