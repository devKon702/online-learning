package com.ktpm.controller;

import com.ktpm.dto.GroupDto;
import com.ktpm.dto.UserDto;
import com.ktpm.request.GroupRequest;
import com.ktpm.request.UserGroupRequest;
import com.ktpm.response.Response;
import com.ktpm.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @PostMapping("/groups")
    public ResponseEntity<?> createGroup(@RequestBody GroupRequest groupRequest){
        Response response = new Response();

        response.setData(groupService.createGroup(groupRequest));
        response.setSuccess(true);
        response.setMessage("Tạo class thành công");

        return  ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PutMapping("/groups")
    public ResponseEntity<?> updateGroup(@RequestBody GroupRequest groupRequest) {
        Response responseData = new Response();
        responseData.setData(groupService.updateGroup(groupRequest));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }
    //
//    @GetMapping("/group")
//    public ResponseEntity<?> getGroups() {
//        Response responseData = new Response();
//        responseData.setSuccess(true);
//
//        logger.log(LogLevel.INFO, "GET GROUPS " +  " IS SUCCESSFULLY");
//        return  ResponseEntity.status(HttpStatus.CREATED).body(responseData);
//    }
//
//
//    @GetMapping("/group/{id}")
//    public ResponseEntity<?> getGroupById(@PathVariable(name = "id") Long id) {
//        Response responseData = new Response();
//
//        GroupDto groupDto = groupService.getGroupById(id);
//        responseData.setData(groupDto);
//        responseData.setSuccess(true);
//        logger.log(LogLevel.INFO, "GET GROUP ID " + id.toString() + " IS SUCCESSFULLY");
//        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
//    }
//
        @GetMapping("/groups/{id}/members")
    public ResponseEntity<?> getUserOfGroupById(@PathVariable Long id) {
        Response responseData = new Response();

        List<UserDto> userDtos= groupService.getUserOfGroup(id);
        responseData.setData(userDtos);
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/groups/owner")
    public ResponseEntity<?> getGroupByUser() {
        Response responseData = new Response();
        List<GroupDto> groupDtos = groupService.getGroupByUser();
        responseData.setSuccess(true);
        responseData.setData(groupDtos);
        responseData.setMessage("Truy vấn thành công");
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/groups/detail/{id}")
    public ResponseEntity<?> getGroupByIdDetail(@PathVariable(name = "id") Long id) {
        Response response = new Response();

        GroupDto groupDto = groupService.getGroupDetailById(id);
        response.setData(groupDto);
        response.setSuccess(true);

        return  ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/groups/{id}")
    public ResponseEntity<?> deleteGroupById(@PathVariable Long id) {
        Response responseData = new Response();
        responseData.setData(groupService.deleteGroupById(id));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @PostMapping("/groups/delete-user")
    public ResponseEntity<?> deleteUserGroup(@RequestBody UserGroupRequest userGroupRequest) {
        Response responseData = new Response();
        responseData.setData(groupService.deleteUserGroupById(userGroupRequest));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @PostMapping("/groups/invite-users")
    public ResponseEntity<?> addUserGroup(@RequestBody UserGroupRequest userGroupRequest){
        Response responseData = new Response();

        responseData.setData(groupService.addUserGroup(userGroupRequest));
        responseData.setSuccess(true);
        responseData.setMessage("Gửi mail đến người dùng thành công");

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }


    @GetMapping("/groups/attendance")
    public ResponseEntity<?> getGroupAttendance(){
        Response responseData = new Response();

        responseData.setData(groupService.getGroupAttend());
        responseData.setSuccess(true);
        responseData.setMessage("Truy vấn thành công");

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }
}
