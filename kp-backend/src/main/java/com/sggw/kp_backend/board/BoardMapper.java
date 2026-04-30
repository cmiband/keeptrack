package com.sggw.kp_backend.board;

import org.springframework.stereotype.Component;

@Component
public class BoardMapper {
    public BoardDto boardToBoardDto(Board board) {
        if (board == null) return null;

        return BoardDto.builder()
                .boardId(board.getBoardId())
                .boardName(board.getBoardName())
                .authorId(board.getAuthorId())
                .build();
    }
}
