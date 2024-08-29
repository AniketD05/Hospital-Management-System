package com.hospital.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.daos.UsersRepository;
import com.hospital.entities.User;
import com.hospital.models.LoginDTO;

@Service
public class UserService {

	@Autowired private UsersRepository repo;
	
	public void registerUser(User user) {
		repo.save(user);
	}
	
	public User validate(LoginDTO dto) {
		Optional<User> user=repo.findById(dto.getUserid());
		if(user.isPresent() && user.get().getPassword().equals(dto.getPwd())){
			return user.get();
		}
		return null;
	}
	
	public Optional<User> findByUserid(String userid) {
		return repo.findById(userid);
	}
	
	public void deleteUser(int id,String role) {
		User u=repo.findByUidAndRole(id,role);
		repo.delete(u);
	}
	
}
