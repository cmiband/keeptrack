package com.sggw.kp_backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public Board getBoardById(int boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board with id: " + boardId + " was not found"));
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Board createBoard(BoardCreateRequest request) {
        Board board = new Board(null, request.getBoardName(), request.getAuthorId());
        boardRepository.save(board);
        return board;
    }

    public void deleteBoard(int boardId) {
        Board board = getBoardById(boardId);
        boardRepository.delete(board);
    }

    public void updateBoard(int boardId, BoardUpdateRequest request) {
        Board board = getBoardById(boardId);
        board.setBoardName(request.getBoardName());
        boardRepository.save(board);
    }
}
