package com.sggw.kp_backend.boardassignment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardAssignmentRepository extends JpaRepository<BoardAssignment, Integer> {
    List<BoardAssignment> findByUserId(Integer userId);
    Optional<BoardAssignment> findByBoardIdAndUserId(Integer boardId, Integer userId);
    List<BoardAssignment> findByBoardId(Integer boardId);
}
