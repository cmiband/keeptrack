package com.sggw.kp_backend.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskUpdateRequest {

    private String taskName;
    private String description;
    private LocalDate targetDate;
    private Integer boardId;
}