package com.sggw.kp_backend.boardassignment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardAssignmentService {
    private final BoardAssignmentRepository boardAssignmentRepository;

    public BoardAssignment getBoardAssignmentById(int id) {
        return boardAssignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BoardAssignment with id: " + id + " was not found"));
    }

    public List<BoardAssignment> getAllBoardAssignments() {
        return boardAssignmentRepository.findAll();
    }

    public BoardAssignment createBoardAssignment(BoardAssignmentCreateRequest request) {
        BoardAssignment boardAssignment = new BoardAssignment(null, request.getBoardId(), request.getUserId());
        boardAssignmentRepository.save(boardAssignment);
        return boardAssignment;
    }

    public void deleteBoardAssignment(int id) {
        BoardAssignment boardAssignment = getBoardAssignmentById(id);
        boardAssignmentRepository.delete(boardAssignment);
    }

    public void updateBoardAssignment(int id, BoardAssignmentUpdateRequest request) {
        BoardAssignment boardAssignment = getBoardAssignmentById(id);
        boardAssignment.setBoardId(request.getBoardId());
        boardAssignment.setUserId(request.getUserId());
        boardAssignmentRepository.save(boardAssignment);
    }
}
