package com.ktpm.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserRequest {
    private String name;
    private String birthdate;
    private Boolean isEnabled;
    private Integer age;
    private String gender;
    private String phone;
}
