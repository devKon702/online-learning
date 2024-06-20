package com.ktpm.request;

import com.ktpm.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    private Long id;
    private String email;
    private String content;
    private Long parentId;
    private Long groupId;
}

