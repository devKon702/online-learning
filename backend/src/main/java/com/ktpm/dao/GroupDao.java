package com.ktpm.dao;

import com.ktpm.entity.Group;
import com.ktpm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface GroupDao extends JpaRepository<Group, Long> {
    List<Group> findByOwner(User user);
}
