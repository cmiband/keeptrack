package com.sggw.kp_backend.boardassignment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardAssignmentCreateRequest {
    private Integer boardId;
    private Integer userId;
}