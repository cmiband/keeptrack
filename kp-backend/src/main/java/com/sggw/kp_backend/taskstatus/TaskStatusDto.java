package com.sggw.kp_backend.taskstatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskStatusDto {
    private Integer boardId;
    private Integer taskStatusId;
    private String statusName;
    private String statusLabel;
    private String statusColor;
    private Integer statusOrder;
}
