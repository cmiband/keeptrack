package com.sggw.kp_backend.taskcomment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskCommentCreateRequest {
    private Integer authorId;
    private String commentBody;
    private Integer taskId;
}
