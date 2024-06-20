package com.ktpm.controller;

import com.ktpm.request.CommentRequest;
import com.ktpm.response.Response;
import com.ktpm.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/comments")
    public ResponseEntity<?> createComment(@RequestBody CommentRequest commentRequest) {
        Response responseData = new Response();

        responseData.setData(commentService.createComment(commentRequest));
        responseData.setSuccess(true);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseData);
    }

    @GetMapping("/comments/groups/{id}")
    public ResponseEntity<?> getCommentByGroupId(@PathVariable Long id) {
        Response responseData = new Response();

        responseData.setData(commentService.getCommentByGroupId(id));
        responseData.setSuccess(true);

        return ResponseEntity.status(HttpStatus.OK).body(responseData);
    }
}
