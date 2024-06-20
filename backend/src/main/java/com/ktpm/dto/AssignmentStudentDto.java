package com.ktpm.dto;

import com.ktpm.entity.Assignment;
import lombok.*;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AssignmentStudentDto {
    private Long id;
    private String name;
    private Date deadline;
    private String description;
    private String url;
    private int quantitySubmit;


    public AssignmentStudentDto(Assignment assignment) {
        this.id = assignment.getId();
        this.name = assignment.getName();
        this.deadline = assignment.getDeadline();
        this.description = assignment.getDescription();
        this.url = assignment.getUrl(); // này chỉ cần hiển thị số lượng submit thôi
        this.quantitySubmit = assignment.getSubmits().size();
    }
}
