package com.sggw.kp_backend.taskstatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskStatusUpdateRequest {
    private String statusName;
    private String statusLabel;
}
