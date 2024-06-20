package com.ktpm.exception;

import com.ktpm.mylogger.LogLevel;
import com.ktpm.mylogger.Logger;
import com.ktpm.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    private Logger logger = Logger.getInstance();
    @ExceptionHandler(GroupAlreadyExistsException.class)
    public ResponseEntity<Response> handlerGroupAlreadyExistsException(GroupAlreadyExistsException exception,
                                                                       WebRequest webRequest) {
        Response responseData = new Response();
        responseData.setData(false);
        responseData.setSuccess(false);
        logger.log(LogLevel.ERROR, exception.getMessage());
        return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
    }
}
