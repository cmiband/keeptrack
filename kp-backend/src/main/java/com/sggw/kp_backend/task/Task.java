package com.sggw.kp_backend.task;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "task", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taskid")
    private Integer taskId;

    @Column(name = "taskname", length = 255)
    private String taskName;

    @Column(name = "authorid", nullable = false)
    private Integer authorId;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "createddate")
    private LocalDate createdDate;

    @Column(name = "targetdate")
    private LocalDate targetDate;

    @Column(name = "boardid")
    private Integer boardId;
}
