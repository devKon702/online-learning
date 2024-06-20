package com.ktpm.controller;


import com.ktpm.response.Response;
import com.ktpm.service.SubmitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("api/v1/students")
public class SubmitSutudentController {

    private final SubmitService submitService;


    @PostMapping("/submits")
    public ResponseEntity<?> createGroup(@RequestParam Long idGroup,
                                         @RequestParam Long idAssignment,
                                         @RequestParam MultipartFile file
                                         ) throws Exception {
        Response response = new Response();

        submitService.createSubmit(idGroup, idAssignment, file);

        return  ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // lấy ra toàn bộ submit cho admin

}
