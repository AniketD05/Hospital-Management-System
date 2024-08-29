package com.hospital.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.daos.PatientBillRepository;
import com.hospital.entities.PatientBill;
import com.hospital.models.PatientBillDTO;
import com.hospital.models.UpdateStatusDTO;

@Service
public class PatientBillService {

	@Autowired private PatientBillRepository repo;
	@Autowired private AppointmentService service;
	
	public void save(PatientBillDTO dto) {
		PatientBill pb=new PatientBill();
		BeanUtils.copyProperties(dto, pb);
		pb.setAppointment(service.findByApptId(dto.getAppointmentid()));
		repo.save(pb);
		UpdateStatusDTO adto=new UpdateStatusDTO();
		adto.setAppointmentid(dto.getAppointmentid());
		adto.setStatus("Paid");
		service.updateStatus(adto);
	}
	
	public PatientBill findById(int id) {
		return repo.findById(id).get();
	}
	
	public PatientBill findByAppointmentid(int id) {
		return repo.findByAppointment(service.findByApptId(id));
	}
	
}
