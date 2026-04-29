package com.sggw.kp_backend.boardassignment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardAssignmentRepository extends JpaRepository<BoardAssignment, Integer> {
}
