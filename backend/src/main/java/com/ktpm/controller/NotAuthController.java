package com.ktpm.controller;

import com.ktpm.response.Response;
import com.ktpm.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class NotAuthController {

    private final GroupService groupService;
    @GetMapping("/groups/{id}/add-users/active/{token}")
    public ResponseEntity<?> addUserGroup(@PathVariable(name = "id") Long id,
                                          @PathVariable(name = "token") String token){
        Response response = new Response();

        response.setData(groupService.activeUserGroup(id, token));
        response.setSuccess(true);
        response.setMessage("Bạn đã tham gia lớp học");

        return  ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
