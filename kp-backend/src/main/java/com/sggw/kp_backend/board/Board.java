package com.sggw.kp_backend.board;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "board", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "boardid")
    private Integer boardId;

    @Column(name = "boardname", length = 255)
    private String boardName;

    @Column(name = "authorid", nullable = false)
    private Integer authorId;
}
