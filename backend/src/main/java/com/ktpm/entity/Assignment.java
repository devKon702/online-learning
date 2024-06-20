package com.ktpm.entity;


import com.google.api.client.util.DateTime;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Table(name="assignments")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Assignment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // tiêu đề bài tập + file.
    @Column
    private String name;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date deadline;

    @Column
    private String description; // mô tả.

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_group")
    private Group group;

    @Column
    private String url; // liên kết tới file ( firebase )

    @OneToMany(mappedBy = "assignment", fetch = FetchType.EAGER)
    private List<Submit> submits = new ArrayList<>();

}

