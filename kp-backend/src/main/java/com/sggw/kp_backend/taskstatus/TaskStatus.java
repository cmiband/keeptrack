package com.sggw.kp_backend.taskstatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "taskstatus", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taskstatusid")
    private Integer taskStatusId;

    @Column(name = "statusname", length = 255)
    private String statusName;

    @Column(name = "statuslabel", length = 255)
    private String statusLabel;
}
