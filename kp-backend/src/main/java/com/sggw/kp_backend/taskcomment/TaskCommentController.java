package com.sggw.kp_backend.taskcomment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task-comment")
@RequiredArgsConstructor
public class TaskCommentController {
    private final TaskCommentService taskCommentService;
    private final TaskCommentMapper taskCommentMapper;

    @GetMapping
    public List<TaskCommentDto> getAllTaskComments() {
        return taskCommentService.getAllTaskComments().stream()
                .map(taskCommentMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public TaskCommentDto getTaskCommentById(@PathVariable int id) {
        return taskCommentMapper.toDto(taskCommentService.getTaskCommentById(id));
    }

    @PostMapping("/create")
    public TaskComment createTaskComment(@Valid @RequestBody TaskCommentCreateRequest request) {
        return taskCommentService.createTaskComment(request);
    }

    @DeleteMapping("/{id}")
    public void deleteTaskComment(@PathVariable int id) {
        taskCommentService.deleteTaskComment(id);
    }

    @PutMapping("/{id}")
    public void updateTaskComment(@PathVariable int id, @Valid @RequestBody TaskCommentUpdateRequest request) {
        taskCommentService.updateTaskComment(id, request);
    }
}