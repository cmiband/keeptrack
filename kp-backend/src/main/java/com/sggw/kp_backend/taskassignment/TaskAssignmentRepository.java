package com.sggw.kp_backend.taskassignment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TaskAssignmentRepository extends JpaRepository<TaskAssignment, Integer> {
    List<TaskAssignment> findByTaskId(Integer taskId);
    List<TaskAssignment> findByTaskIdIn(Collection<Integer> taskIds);
}