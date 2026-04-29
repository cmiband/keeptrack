package com.sggw.kp_backend.taskcomment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "taskcomment", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taskcommentid")
    private Integer taskCommentId;

    @Column(name = "authorid")
    private Integer authorId;

    @Column(name = "createddate")
    private LocalDate createdDate;

    @Column(name = "commentbody", columnDefinition = "text")
    private String commentBody;

    @Column(name = "taskid", nullable = false)
    private Integer taskId;
}
