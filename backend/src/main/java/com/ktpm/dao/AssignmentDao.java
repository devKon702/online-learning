package com.ktpm.dao;

import com.ktpm.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssignmentDao extends JpaRepository<Assignment, Long> {

    // có email, idGroup, idAssignment
    @Query("SELECT a FROM Assignment a " +
            "JOIN a.group g " +
            "JOIN g.userGroups ug " +
            "JOIN ug.user u " +
            "WHERE a.id = ?1 " +
            "AND g.id = ?2 " +
            "AND u.email = ?3")
    Optional<Assignment> findAssignmentByIdGroupIdAndUserEmail(Long idAssignment, Long idGroup, String email);
}
