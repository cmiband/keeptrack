package com.sggw.kp_backend.boardassignment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board-assignment")
@RequiredArgsConstructor
public class BoardAssignmentController {
    private final BoardAssignmentService boardAssignmentService;
    private final BoardAssignmentMapper boardAssignmentMapper;

    @GetMapping
    public List<BoardAssignmentDto> getAllBoardAssignments() {
        return boardAssignmentService.getAllBoardAssignments().stream()
                .map(boardAssignmentMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public BoardAssignmentDto getBoardAssignmentById(@PathVariable int id) {
        return boardAssignmentMapper.toDto(boardAssignmentService.getBoardAssignmentById(id));
    }

    @PostMapping("/create")
    public BoardAssignment createBoardAssignment(@Valid @RequestBody BoardAssignmentCreateRequest request) {
        return boardAssignmentService.createBoardAssignment(request);
    }

    @DeleteMapping("/{id}")
    public void deleteBoardAssignment(@PathVariable int id) {
        boardAssignmentService.deleteBoardAssignment(id);
    }

    @PutMapping("/{id}")
    public void updateBoardAssignment(@PathVariable int id, @Valid @RequestBody BoardAssignmentUpdateRequest request) {
        boardAssignmentService.updateBoardAssignment(id, request);
    }
}