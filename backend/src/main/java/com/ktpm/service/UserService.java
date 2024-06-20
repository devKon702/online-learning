package com.ktpm.service;


import com.ktpm.Helper;
import com.ktpm.dao.UserDao;
import com.ktpm.dto.UserDto;
import com.ktpm.entity.Role;
import com.ktpm.entity.User;
import java.nio.file.Paths;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final Helper helper;

    public UserDto updateRoleTeacher() {
        // update lên role hiện tại
        User user = helper.getUser();
        Role role = new Role("TEACHER");
        user.getRoles().add(role);
        return new UserDto(userDao.save(user));
    }


    // update thông tin theo.  name, gender, age, phone, dataOfBirth, avatar
    public UserDto updateUser(String name, String gender, Integer age, String phone, String dataOfBirth, MultipartFile avatar) throws IOException {
        // kiểm tra thông tin nào cập nhập thì cập nhập. thông tin còn lại hông quan tâm
        User user = helper.getUser();
        if (name!= null) {
            user.setName(name);
        }
        if (gender != null) {
            user.setGender(gender);
        }
        if (age != null) {
            user.setAge(age);
        }
        if (phone != null) {
            user.setPhone(phone);
        }
        if (dataOfBirth != null) {
            user.setDateOfBirth(dataOfBirth);
        }


        if (avatar != null) {
            String UPLOAD_DIR = "\\src\\main\\resources\\static\\avatar\\";
            try {
                String uploadPath = Paths.get("").toAbsolutePath() + UPLOAD_DIR;
                String oldAvatar = user.getAvatar();
                if (oldAvatar != null) {
                    File oldFileAvatar = new File(uploadPath + oldAvatar);
                    if (oldFileAvatar.exists()) {
                        boolean isDeleted = oldFileAvatar.delete();
                        System.out.println("delete: " + isDeleted + " " + oldFileAvatar);
                    }
                }
                String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("mm-hh-dd-MM-yyyy"));
                String originalFilename = avatar.getOriginalFilename();
                String newFilename = timestamp + "-" + originalFilename;
                String filePath = Paths.get(uploadPath, newFilename).toString();
                File des = new File(filePath);
                avatar.transferTo(des);
                user.setAvatar(newFilename);
            }
            catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }

        return new UserDto(userDao.save(user));
    }


    public UserDto getInfoUser() {
        return new UserDto(helper.getUser());
    }
    public UserDto getInfoOtherUser(String email) {
        User user = userDao.findById(email).orElseThrow();
        return new UserDto(user);
    }


    public User loadUserByEmail(String email) {
        return userDao.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("not found user!"));
    }
}
