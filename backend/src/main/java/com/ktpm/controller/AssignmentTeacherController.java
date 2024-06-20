package com.ktpm.controller;


import com.ktpm.response.Response;
import com.ktpm.service.AssignmentService;
import com.ktpm.service.SubmitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("api/v1/teacher")
public class AssignmentTeacherController {

    private final AssignmentService assignmentService;

    // lấy ra chi tiết bài tập dựa vào id + thằng đó
    @GetMapping("/assignments/{id}")
    public ResponseEntity<?> getTeacherAssignment(@PathVariable Long id) throws Exception {

        Response response = Response.builder()
                .data(assignmentService.getTeacherAssignment(id))
                .success(true)
                .message("Truy vấn thành công")
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/assignments")
    public ResponseEntity<?> filterCards(@RequestParam String name,
                                         @RequestParam String description,
                                         @RequestParam Long idGroup,
                                         @RequestParam String deadline,
                                         @RequestParam MultipartFile file
    ) throws Exception {

        Date dDeadline = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(deadline);
        boolean result = assignmentService.createAssignment(name, description, idGroup, dDeadline, file);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
