package com.hospital.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.daos.PatientRepository;
import com.hospital.entities.Patient;

@Service
public class PatientService {

	@Autowired PatientRepository prepo;
	
	public int savePatient(Patient p) {
		return prepo.save(p).getId();
	}
	
	public List<Patient> allPatients(){
		return prepo.findAll();
	}
	
	public long countPatient() {
		return prepo.count();
	}
	
	public Patient findByPatientId(int id) {
		return prepo.findById(id).orElse(null);
	}
	
	public void deletePatient(int id) {
		Patient pat=findByPatientId(id);
		pat.setIsactive(false);
		prepo.save(pat);
	}

	public Patient findByName(String name) {
		return prepo.findByName(name).orElse(null);
	}
}
