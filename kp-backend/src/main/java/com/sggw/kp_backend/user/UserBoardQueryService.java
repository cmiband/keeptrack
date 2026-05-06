package com.sggw.kp_backend.user;

import com.sggw.kp_backend.board.Board;
import com.sggw.kp_backend.board.BoardRepository;
import com.sggw.kp_backend.boardassignment.BoardAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserBoardQueryService {
    private final UserService userService;
    private final BoardAssignmentRepository boardAssignmentRepository;
    private final BoardRepository boardRepository;

    public List<Board> getBoardsByUserId(int userId) {
        userService.getUserById(userId);
        Set<Integer> boardIds = boardAssignmentRepository.findByUserId(userId).stream()
                .map(assignment -> assignment.getBoardId())
                .collect(LinkedHashSet::new, Set::add, Set::addAll);
        if (boardIds.isEmpty()) {
            return List.of();
        }
        return boardRepository.findAllById(boardIds);
    }
}
