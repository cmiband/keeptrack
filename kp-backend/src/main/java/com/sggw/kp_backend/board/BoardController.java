package com.sggw.kp_backend.board;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper boardMapper;

    @GetMapping
    public List<BoardDto> getAllBoards() {
        return boardService.getAllBoards().stream()
                .map(boardMapper::boardToBoardDto)
                .toList();
    }

    @GetMapping("/{id}")
    public BoardDto getBoardById(@PathVariable int id) {
        return boardMapper.boardToBoardDto(boardService.getBoardById(id));
    }

    @PostMapping("/create")
    public Board createBoard(@Valid @RequestBody BoardCreateRequest request) {
        return boardService.createBoard(request);
    }

    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable int boardId) {
        boardService.deleteBoard(boardId);
    }

    @PutMapping("/{boardId}")
    public void updateBoard(@PathVariable int boardId, @Valid @RequestBody BoardUpdateRequest request) {
        boardService.updateBoard(boardId, request);
    }
}
