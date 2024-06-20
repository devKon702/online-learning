package com.ktpm.dto;


import com.ktpm.entity.Submit;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SubmitDto {

    private Long id;
    private String url;
    private Date time;
    private UserDto user;


    // nhận thông tin của submit
    public SubmitDto(Submit submit) {
        this.id = submit.getId();
        this.url = submit.getUrl();
        this.time = submit.getTime();
        user = new UserDto(submit.getUser());
    }

}
