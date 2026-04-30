package com.sggw.kp_backend.taskcomment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskCommentDto {
    private Integer taskCommentId;
    private Integer authorId;
    private LocalDate createdDate;
    private String commentBody;
    private Integer taskId;
}