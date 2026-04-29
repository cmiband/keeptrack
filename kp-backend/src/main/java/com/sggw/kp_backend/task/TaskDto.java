package com.sggw.kp_backend.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {

    private Integer taskId;
    private String taskName;
    private Integer authorId;
    private String description;
    private LocalDate createdDate;
    private LocalDate targetDate;
    private Integer boardId;
}
