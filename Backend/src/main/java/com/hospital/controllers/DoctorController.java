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
import com.hospital.entities.User;
import com.hospital.models.DoctorDTO;
import com.hospital.models.Response;
import com.hospital.services.DoctorService;
import com.hospital.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
	
	@Autowired DoctorService dservice;
	@Autowired UserService uservice;

	@GetMapping
	public ResponseEntity<?> findAllDoctors() {
		List<Doctor> result = dservice.allDocs();
		return Response.success(result);
	}
	
	@GetMapping("generateid")
	public ResponseEntity<?> generateDoctorId(){
		return Response.success(dservice.generateId());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findDoctorDetails(@PathVariable("id")int id) {
		Doctor result = dservice.findById(id);
		return Response.success(result);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateDoctorDetails(@PathVariable("id")int id,@RequestBody Doctor doctor) {
		dservice.saveDoctor(doctor);
		return ResponseEntity.ok("Updated successfully");
	}
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody DoctorDTO dto) {
		Doctor doc=new Doctor();
		BeanUtils.copyProperties(dto, doc);
		int id=dservice.saveDoctor(doc);
		User user=new User();
		user.setUname(dto.getName());
		user.setPassword(dto.getPwd());
		user.setRole("Doctor");
		user.setUid(id);
		user.setUserid(dto.getUserid());
		uservice.registerUser(user);
		return Response.success("Doctor registered successfully");
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> delete(@PathVariable("id")int id){
		dservice.deleteDoctor(id);
		return Response.success("Doctor removed successfully");
	}

}
