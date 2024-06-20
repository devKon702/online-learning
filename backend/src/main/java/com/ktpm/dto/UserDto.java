package com.ktpm.dto;

import com.ktpm.entity.Role;
import com.ktpm.entity.User;
import lombok.*;
import org.springframework.data.jpa.repository.query.JSqlParserUtils;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDto {
    private String email;
    private String name;
    private String dateOfBirth;
    private String createAt;
    private Boolean isEnabled;
    private List<String> roles;
    private String avatar;
    private String gender;
    private String phone;
    private Integer age;
    public UserDto(User user) {

        roles = new ArrayList<>();
        avatar = user.getAvatar();
        email = user.getEmail();
        name = user.getName();
        dateOfBirth = user.getDateOfBirth();
        createAt = user.getCreateAt();
        isEnabled = user.getIsEnabled();
        gender = user.getGender();
        phone = user.getPhone();
        age= user.getAge();

        user.getRoles().forEach(role -> {
            roles.add(role.getName());
        });
    }
}
    