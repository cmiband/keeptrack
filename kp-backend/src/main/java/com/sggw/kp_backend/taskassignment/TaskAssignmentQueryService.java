package com.sggw.kp_backend.taskassignment;

import com.sggw.kp_backend.task.TaskRepository;
import com.sggw.kp_backend.user.User;
import com.sggw.kp_backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TaskAssignmentQueryService {
    private final TaskAssignmentRepository taskAssignmentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<User> getUsersByTaskId(int taskId) {
        List<TaskAssignment> assignments = taskAssignmentRepository.findByTaskId(taskId);
        return getUsersFromAssignments(assignments);
    }

    public List<User> getUsersByBoardId(int boardId) {
        var taskIds = taskRepository.findByBoardId(boardId).stream()
                .map(task -> task.getTaskId())
                .toList();

        if (taskIds.isEmpty()) {
            return List.of();
        }

        List<TaskAssignment> assignments = taskAssignmentRepository.findByTaskIdIn(taskIds);
        return getUsersFromAssignments(assignments);
    }

    public Map<Integer, List<User>> getUsersByTaskIds(List<Integer> taskIds) {
        if (taskIds == null || taskIds.isEmpty()) {
            return Map.of();
        }

        List<TaskAssignment> assignments = taskAssignmentRepository.findByTaskIdIn(taskIds);
        Map<Integer, Set<Integer>> taskUserIds = new LinkedHashMap<>();
        for (Integer taskId : taskIds) {
            taskUserIds.put(taskId, new LinkedHashSet<>());
        }

        for (TaskAssignment assignment : assignments) {
            taskUserIds.computeIfAbsent(assignment.getTaskId(), ignored -> new LinkedHashSet<>())
                    .add(assignment.getUserId());
        }

        Set<Integer> allUserIds = new LinkedHashSet<>();
        for (Set<Integer> userIds : taskUserIds.values()) {
            allUserIds.addAll(userIds);
        }

        Map<Integer, User> usersById = new HashMap<>();
        for (User user : userRepository.findAllById(allUserIds)) {
            usersById.put(user.getId(), user);
        }

        Map<Integer, List<User>> response = new LinkedHashMap<>();
        for (Map.Entry<Integer, Set<Integer>> entry : taskUserIds.entrySet()) {
            List<User> users = entry.getValue().stream()
                    .map(usersById::get)
                    .filter(user -> user != null)
                    .toList();
            response.put(entry.getKey(), users);
        }

        return response;
    }

    private List<User> getUsersFromAssignments(List<TaskAssignment> assignments) {
        Set<Integer> userIds = assignments.stream()
                .map(TaskAssignment::getUserId)
                .collect(LinkedHashSet::new, Set::add, Set::addAll);
        if (userIds.isEmpty()) {
            return List.of();
        }
        return userRepository.findAllById(userIds);
    }
}
