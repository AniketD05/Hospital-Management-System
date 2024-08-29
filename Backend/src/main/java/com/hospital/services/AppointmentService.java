package com.hospital.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.hospital.daos.AppintmentRepo;
import com.hospital.entities.Appointment;
import com.hospital.entities.Doctor;
import com.hospital.models.AppointmentDTO;
import com.hospital.models.AppointmentFilterDTO;
import com.hospital.models.TreatmentDTO;
import com.hospital.models.UpdateStatusDTO;

@Service
public class AppointmentService {
	
	@Autowired AppintmentRepo repo;
	@Autowired DoctorService dservice;
	@Autowired PatientService pservice;
	@Autowired TreatmentService tservice;
	
	public void saveAppointment(AppointmentDTO dto) {
		Appointment apt=new Appointment();
		apt= AppointmentDTO.fromEntity(dto);		
		System.out.println(apt);
		apt.setDoctor(dservice.findById(dto.getDoctorid()));
		apt.setPatient(pservice.findByPatientId(dto.getPatientid()));
		repo.save(apt);
	}
	
	public List<Appointment> findByDoctor(int docid){
		return  repo.findByDoctor(dservice.findById(docid));
	}
	
	public List<Appointment> findFilterDoctor(AppointmentFilterDTO dto){
		Doctor doctor=dservice.findById(dto.getDoctorid());
		if(dto.getDate() == null) {
		return  repo.findByDoctorAndDate(doctor,LocalDate.now());
		}else {
			return repo.findByDoctorAndDate(doctor,dto.getDate());
		}
	}
	
	public void updateStatus(UpdateStatusDTO dto) {
		Appointment apt=findByApptId(dto.getAppointmentid());
		apt.setStatus(dto.getStatus());
		apt.setCancelBy(dto.getCancelby());		
		repo.save(apt);
		if(apt.getStatus().equals("Accepted")) {			
			tservice.saveTreatment(dto.getAppointmentid());
		}
	}

	public List<Appointment> findByPatientId(int patid){
		return  repo.findByPatient(pservice.findByPatientId(patid));
	}
	
	public List<Appointment> allAppointments(){
		return  repo.findAll(Sort.by(Direction.DESC, "appointmentid"));
	}
	
	public Appointment findByApptId(int id) {
		return repo.getById(id);
	}
}
