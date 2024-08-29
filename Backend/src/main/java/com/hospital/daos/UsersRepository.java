package com.hospital.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hospital.entities.User;

@Repository
public interface UsersRepository extends JpaRepository<User, String> {

	User findByUidAndRole(int id,String role);
}
