package com.hospital.controllers;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entities.Doctor;
import com.hospital.entities.Patient;
import com.hospital.entities.Reception;
import com.hospital.entities.User;
import com.hospital.models.ReceptionDTO;
import com.hospital.models.Response;
import com.hospital.services.ReceptionService;
import com.hospital.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/receptions")
public class ReceptionController {

	@Autowired ReceptionService pservice;
	@Autowired UserService uservice;
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		List<Reception> result = pservice.allReceptions();
		return Response.success(result);
	}
	
	@GetMapping("generateid")
	public ResponseEntity<?> generateDoctorId(){
		return Response.success(pservice.generateId());
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updatereceptionDetails(@PathVariable("id")int id,@RequestBody Reception rec) {
		rec.setId(id);
		pservice.saveReception(rec);
		return ResponseEntity.ok("Updated successfully");
	}
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody ReceptionDTO dto) {
		Reception rec=new Reception();
		BeanUtils.copyProperties(dto, rec);
		int id=pservice.saveReception(rec);
		User user=new User();
		user.setUname(dto.getName());
		user.setPassword(dto.getPwd());
		user.setRole("Reception");
		user.setUid(id);
		user.setUserid(dto.getUserid());
		uservice.registerUser(user);
		return Response.success("Reception registered successfully");
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findReceptionDetails(@PathVariable("id")int id) {
		return Response.success(pservice.findById(id));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteReception(@PathVariable("id")int id) {
		pservice.deleteReception(id);
		return Response.success("Deleted successfully");
	}	
}
