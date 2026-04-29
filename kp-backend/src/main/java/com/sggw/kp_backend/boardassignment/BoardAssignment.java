package com.sggw.kp_backend.boardassignment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "boardassignment", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "boardassignmentid")
    private Integer boardAssignmentId;

    @Column(name = "boardid")
    private Integer boardId;

    @Column(name = "userid")
    private Integer userId;
}
