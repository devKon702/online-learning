package com.ktpm.entity;



import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name="submits")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Submit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    private Date time;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_assignment")
    private Assignment assignment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "email_user")
    private User user;
}
