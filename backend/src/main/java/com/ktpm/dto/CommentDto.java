package com.ktpm.dto;

import com.ktpm.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentDto {
    private Long id;
    private String content;
    private UserDto user;
    private List<CommentDto> commentsChild = new ArrayList<>();
    private Date created;

    public static CommentDto mapToCommentDto(Comment comment){
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setContent(comment.getContent());
        commentDto.setUser(new UserDto(comment.getUser()));
        commentDto.setCreated(comment.getCreated());

        List<CommentDto> commentDtos = new ArrayList<>();
        comment.getComments().forEach(commentDB -> {
            commentDtos.add(CommentDto.mapToCommentDto(commentDB)   );
        });
        commentDto.setCommentsChild(commentDtos);

        return commentDto;
    }
}
