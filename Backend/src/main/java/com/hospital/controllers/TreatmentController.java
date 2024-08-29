package com.hospital.controllers;

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

import com.hospital.entities.Treatment;
import com.hospital.models.PrescriptionDTO;
import com.hospital.models.TreatmentDTO;
import com.hospital.services.TreatmentService;

@CrossOrigin
@RestController
@RequestMapping("/api/treatments")
public class TreatmentController {

	@Autowired private TreatmentService tservice;
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateAppointments(@PathVariable("id")int id, @RequestBody TreatmentDTO dto) {	
		tservice.updateTreatment(id, dto);
		return ResponseEntity.ok("Treatment updated");
	}
	
	@GetMapping("{id}")
	public Treatment getTreatmentDetails(@PathVariable("id")int id) {
		return tservice.findByAppointmentid(id);
	}
	
	@PostMapping("prescriptions")
	public ResponseEntity<?> addPrescription(@RequestBody PrescriptionDTO dto) {	
		tservice.addPrescription(dto);
		return ResponseEntity.ok("Prescription added");
	}
	
	@DeleteMapping("prescriptions/{id}")
	public ResponseEntity<?> deletePrescription(@PathVariable("id")int id) {	
		tservice.deletePrescription(id);
		return ResponseEntity.ok("Prescription deleted");
	}
}
