package com.hospital.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entities.PatientBill;
import com.hospital.models.PatientBillDTO;
import com.hospital.services.PatientBillService;

@CrossOrigin
@RestController
@RequestMapping("/api/billing")
public class BillingController {

	@Autowired private PatientBillService service;
	

	@PostMapping
	public ResponseEntity<?> bookappointment(@RequestBody PatientBillDTO dto) {		
		service.save(dto);
		return ResponseEntity.ok("Billed successfully");
	}
	

	@GetMapping("{id}")
	public PatientBill findBillDetails(@PathVariable("id") int id) {
		return service.findByAppointmentid(id);
	}
	
}
