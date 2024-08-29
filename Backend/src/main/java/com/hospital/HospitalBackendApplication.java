package com.hospital;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.hospital.entities.User;
import com.hospital.services.UserService;

@SpringBootApplication
@EnableJpaAuditing
public class HospitalBackendApplication {
	
	private static final Logger log = LoggerFactory.getLogger(HospitalBackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(HospitalBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(UserService srv) {
	    return (args) -> {
	    	User admin=new User();
	    	admin.setUname("Administrator");
	    	admin.setUserid("admin");
	    	admin.setRole("Admin");
	    	admin.setPassword("admin");
    		srv.registerUser(admin);
    		log.info("Admin user created successfully");
	    };
	}
}
