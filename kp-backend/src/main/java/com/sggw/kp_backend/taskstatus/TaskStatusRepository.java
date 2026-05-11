package com.sggw.kp_backend.taskstatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskStatusRepository extends JpaRepository<TaskStatus, Integer> {

    List<TaskStatus> findByBoardIdOrderByStatusOrderAsc(Integer boardId);
}
