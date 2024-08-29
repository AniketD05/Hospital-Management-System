package com.hospital.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entities.Patient;
import com.hospital.models.Response;
import com.hospital.services.PatientService;
import com.hospital.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/patients")
public class PatientController {

	@Autowired PatientService pservice;
	@Autowired UserService uservice;

	@GetMapping
	public ResponseEntity<?> findAll() {
		List<Patient> result = pservice.allPatients();
		return Response.success(result);
	}
	
	@PostMapping("register")
	public ResponseEntity<?> save(@RequestBody Patient patient) {
		pservice.savePatient(patient);
		return Response.success(patient);
	}
	@GetMapping("{id}")
	public ResponseEntity<?> findPatientDetails(@PathVariable("id")int id) {
		Patient result = pservice.findByPatientId(id);
		return Response.success(result);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deletePatient(@PathVariable("id")int id) {
		pservice.deletePatient(id);
		return Response.success("Deleted successfully");
	}
	
	
	@GetMapping("/findbyname/{name}")
	public ResponseEntity<?> sortPatientDetails(@PathVariable("name")String name) {
		Patient result = pservice.findByName(name);
		return Response.success(result);
	}
	
	
}
