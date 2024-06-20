package com.ktpm.service;


import com.ktpm.Helper;
import com.ktpm.dao.AssignmentDao;
import com.ktpm.dao.SubmitDao;
import com.ktpm.entity.Assignment;
import com.ktpm.entity.Group;
import com.ktpm.entity.Submit;
import com.ktpm.entity.User;
import com.ktpm.request.SubmitRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubmitService {

    private final Helper helper;

    private final SubmitDao submitDao;
    private final AssignmentDao assignmentDao;
    private final FirebaseStorageService firebaseStorageService;

    public void createSubmit(Long idGroup, Long idAssignment, MultipartFile file) throws Exception {

        String emailUser = helper.getEmailUser();
        User user = helper.getUser();
        Assignment assignment = assignmentDao.findAssignmentByIdGroupIdAndUserEmail(idAssignment, idGroup, emailUser).orElse(null);
        if (assignment == null) throw new Exception("Không tìm thấy tài nguyên");

        String url = firebaseStorageService.save("submit", file);

        Submit submit = new Submit();
        submit.setAssignment(assignment);
        submit.setUser(user);
        submit.setUrl(url);
        submit.setTime(new Date());

        submitDao.save(submit);
    }

}
