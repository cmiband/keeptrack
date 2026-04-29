package com.sggw.kp_backend.boardassignment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardAssignmentDto {
    private Integer boardAssignmentId;
    private Integer boardId;
    private Integer userId;
}
