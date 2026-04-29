package com.sggw.kp_backend.taskassignment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "taskassignment", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taskassignmentid")
    private Integer taskAssignmentId;

    @Column(name = "taskid")
    private Integer taskId;

    @Column(name = "userid")
    private Integer userId;
}
