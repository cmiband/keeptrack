package com.sggw.kp_backend.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardCreateRequest {
    private String boardName;
    private Integer authorId;
}
