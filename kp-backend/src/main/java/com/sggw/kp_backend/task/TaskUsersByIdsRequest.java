package com.sggw.kp_backend.task;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class TaskUsersByIdsRequest {
    @NotEmpty
    private List<Integer> taskIds;
}
