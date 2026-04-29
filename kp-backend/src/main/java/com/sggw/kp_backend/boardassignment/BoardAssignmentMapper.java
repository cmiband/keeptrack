package com.sggw.kp_backend.boardassignment;

import org.springframework.stereotype.Component;

@Component
public class BoardAssignmentMapper {
    public BoardAssignmentDto toDto(BoardAssignment boardAssignment) {
        if (boardAssignment == null) return null;

        return BoardAssignmentDto.builder()
                .boardAssignmentId(boardAssignment.getBoardAssignmentId())
                .boardId(boardAssignment.getBoardId())
                .userId(boardAssignment.getUserId())
                .build();
    }
}
