package com.sggw.kp_backend.task;

import com.sggw.kp_backend.auth.UserDto;
import com.sggw.kp_backend.auth.UserMapper;
import com.sggw.kp_backend.taskassignment.TaskAssignmentQueryService;
import com.sggw.kp_backend.taskcomment.TaskCommentDto;
import com.sggw.kp_backend.taskcomment.TaskCommentMapper;
import com.sggw.kp_backend.taskcomment.TaskCommentService;
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
    private final TaskCommentService taskCommentService;
    private final TaskCommentMapper taskCommentMapper;
    private final TaskAssignmentQueryService taskAssignmentQueryService;
    private final UserMapper userMapper;

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

    @GetMapping("/{taskId}/comments")
    public List<TaskCommentDto> getTaskCommentsByTaskId(@PathVariable int taskId) {
        taskService.getTaskById(taskId);
        return taskCommentService.getTaskCommentsByTaskId(taskId).stream()
                .map(taskCommentMapper::toDto)
                .toList();
    }

    @GetMapping("/{taskId}/users")
    public List<UserDto> getUsersByTaskId(@PathVariable int taskId) {
        taskService.getTaskById(taskId);
        return taskAssignmentQueryService.getUsersByTaskId(taskId).stream()
                .map(userMapper::toDto)
                .toList();
    }

    @PostMapping("/users/by-task-ids")
    public List<TaskUsersDto> getUsersByTaskIds(@Valid @RequestBody TaskUsersByIdsRequest request) {
        return taskAssignmentQueryService.getUsersByTaskIds(request.getTaskIds()).entrySet().stream()
                .map(entry -> new TaskUsersDto(
                        entry.getKey(),
                        entry.getValue().stream().map(userMapper::toDto).toList()
                ))
                .toList();
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
