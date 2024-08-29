package com.hospital.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.daos.PrescriptionRepository;
import com.hospital.daos.TreatmentRepository;
import com.hospital.entities.Prescription;
import com.hospital.entities.Treatment;
import com.hospital.models.PrescriptionDTO;
import com.hospital.models.TreatmentDTO;

@Service
public class TreatmentService {

	@Autowired private TreatmentRepository repo;
	@Autowired private AppointmentService service;
	@Autowired private PrescriptionRepository prepo;
	
	public void saveTreatment(int appointmentid) {
		Treatment tt=new Treatment();
		tt.setAppointment(service.findByApptId(appointmentid));
		repo.save(tt);
		System.out.println("Treatment created");
	}
	
	public Treatment findByAppointmentid(int id) {
		return repo.findByAppointment(service.findByApptId(id));
	}
	
	public void updateTreatment(int appointmentid,TreatmentDTO dto) {
		Treatment tt=findByAppointmentid(appointmentid);
		BeanUtils.copyProperties(dto, tt);
		repo.save(tt);
	}
	
	public void addPrescription(PrescriptionDTO dto) {
		Treatment tt=findByAppointmentid(dto.getAppointmentid());
		Prescription pp=new Prescription();
		BeanUtils.copyProperties(dto, pp);
		pp.setTreatment(tt);
		prepo.save(pp);
	}
	
	public void deletePrescription(int id) {
		prepo.deleteById(id);
	}
}
