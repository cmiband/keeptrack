package com.sggw.kp_backend.taskassignment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskAssignmentCreateRequest {
    private Integer taskId;
    private Integer userId;
}
