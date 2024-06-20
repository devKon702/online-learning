package com.ktpm;

import com.ktpm.dao.RoleDao;
import com.ktpm.entity.Role;
import com.ktpm.mylogger.LogLevel;
import com.ktpm.mylogger.Logger;
import com.ktpm.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
public class App {
	private static final Logger logger = Logger.getInstance();
	public static void main(String[] args) {
		Logger.getInstance().log(LogLevel.INFO, "START APPLICATION");
		SpringApplication.run(App.class, args);
	}
		@Bean
		CommandLineRunner commandLineRunner (RoleDao roleDao) {
			return arg -> {
				List<Role> roles = roleDao.findAll();
				if (!roles.isEmpty()) return;
				Role roleStudent = new Role("STUDENT");
				Role roleTeacher = new Role("TEACHER");
				Role roleAdmin = new Role("ADMIN");
				roles.add(roleStudent);
				roles.add(roleTeacher);
				roles.add(roleAdmin);
				roleDao.saveAll(roles);
		};
	}
}



