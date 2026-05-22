package com.sggw.kp_backend.board;

import com.sggw.kp_backend.auth.UserDto;
import com.sggw.kp_backend.auth.UserMapper;
import com.sggw.kp_backend.boardassignment.BoardAssignmentService;
import com.sggw.kp_backend.task.TaskDto;
import com.sggw.kp_backend.task.TaskMapper;
import com.sggw.kp_backend.task.TaskService;
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
    private final BoardAssignmentService boardAssignmentService;
    private final TaskService taskService;
    private final TaskMapper taskMapper;
    private final UserMapper userMapper;

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

    @GetMapping("/{boardId}/tasks")
    public List<TaskDto> getAllTasksByBoardId(@PathVariable int boardId) {
        boardService.getBoardById(boardId);
        return taskService.getAllTasksByBoardId(boardId).stream()
                .map(taskMapper::taskToTaskDto)
                .toList();
    }

    @GetMapping("/{boardId}/users")
    public List<UserDto> getUsersByBoardId(@PathVariable int boardId) {
        boardService.getBoardById(boardId);
        return boardAssignmentService.getUsersByBoardId(boardId).stream()
                .map(userMapper::toDto)
                .toList();
    }
}
