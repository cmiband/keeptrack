package com.sggw.kp_backend.taskcomment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskCommentUpdateRequest {
    private String commentBody;
}
