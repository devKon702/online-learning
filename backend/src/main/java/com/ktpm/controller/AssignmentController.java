package com.ktpm.controller;


import com.ktpm.dto.CardDto;
import com.ktpm.request.AssignmentRequest;
import com.ktpm.response.Response;
import com.ktpm.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("api/v1/student")
public class AssignmentController {

    private final AssignmentService assignmentService;


    @GetMapping("/assignments")
    public ResponseEntity<?> getAssignments(@RequestParam(name = "id-group") Long idGroup
    ) throws Exception {

        Response response = new Response();
        response.setData(assignmentService.getStudentAssignments(idGroup));
        response.setSuccess(true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/assignments/{id}")
    public ResponseEntity<?> getAssignment(@PathVariable Long id) throws Exception {

        Response response = new Response();
        response.setData(assignmentService.getStudentAssignment(id));
        response.setSuccess(true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
