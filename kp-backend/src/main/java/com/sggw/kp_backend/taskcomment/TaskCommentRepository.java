package com.sggw.kp_backend.taskcomment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskCommentRepository extends JpaRepository<TaskComment, Integer> {
    List<TaskComment> findByTaskIdOrderByCreatedDateAsc(Integer taskId);
}
