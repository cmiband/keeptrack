package com.sggw.kp_backend.taskassignment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskAssignmentDto {
    private Integer taskAssignmentId;
    private Integer taskId;
    private Integer userId;
}
