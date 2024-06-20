package com.ktpm.dao;

import com.ktpm.entity.Group;
import com.ktpm.entity.User;
import com.ktpm.entity.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserGroupDao extends JpaRepository<UserGroup, Long> {
    List<UserGroup> findByUserAndGroup(User user, Group group);

    Optional<UserGroup> findByGroupAndTokenActive(Group group, String token);

    List<UserGroup> findByUserAndIsActive(User user, boolean isActive);
}
