package com.hospital.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entities.Appointment;
import com.hospital.models.AppointmentDTO;
import com.hospital.models.AppointmentFilterDTO;
import com.hospital.models.Response;
import com.hospital.models.UpdateStatusDTO;
import com.hospital.services.AppointmentService;

@CrossOrigin
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
	
	@Autowired private AppointmentService service;
	

	@PostMapping
	public ResponseEntity<?> bookappointment(@RequestBody AppointmentDTO dto) {		
		service.saveAppointment(dto);
		return Response.success("Booked successfully");
	}
	
	
	@GetMapping("{id}")
	public Appointment findAppointmentDetails(@PathVariable("id") int id) {
		Appointment result = service.findByApptId(id);
		return result;
	}
	

	@GetMapping
	public List<Appointment> allAppointments() {
		return service.allAppointments();
	}
	
	
	@GetMapping("patients/{id}")
	public List<Appointment> findPatientAppointments(@PathVariable("id") int id) {
		List<Appointment> result = service.findByPatientId(id);
		return result;
	}
	
	
	@GetMapping("doctors/{id}")
	public List<Appointment> findDoctorAppointments(@PathVariable("id") int id) {
		List<Appointment> result = service.findByDoctor(id);
		return result;
	}
	
	
	@GetMapping("filter")
	public List<Appointment> findDoctorFilteredAppointments(AppointmentFilterDTO dto) {		
		return service.findFilterDoctor(dto);
	}

	
	@PostMapping("updatestatus")
	public ResponseEntity<?> updateAppointments(@RequestBody UpdateStatusDTO dto) {	
		service.updateStatus(dto);
		return ResponseEntity.ok("Appointment status updated");
	}
	
	 
}
