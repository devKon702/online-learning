package com.ktpm.dto;

import com.ktpm.entity.Assignment;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AssignmentTeacherDto {
    private Long id;
    private String name;
    private Date deadline;
    private String description;
    private String url;
    private List<SubmitDto> submits;

    public AssignmentTeacherDto(Assignment assignment) {
        submits = new ArrayList<>();
        this.id = assignment.getId();
        this.name = assignment.getName();
        this.deadline = assignment.getDeadline();
        this.description = assignment.getDescription();
        this.url = assignment.getUrl(); // này chỉ cần hiển thị số lượng submit thôi

        // còn có submit dto.
        assignment.getSubmits().forEach(submit -> {
            submits.add(new SubmitDto(submit));
        });


    }

    // url nguời dùng submit


}