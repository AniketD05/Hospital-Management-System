package com.hospital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.daos.DoctorRepository;
import com.hospital.entities.Doctor;

@Service
public class DoctorService {

	@Autowired DoctorRepository drepo;
	@Autowired UserService uservice;
	
	public int saveDoctor(Doctor doc) {
		return drepo.save(doc).getId();
	}
	
	public List<Doctor> allDocs(){
		return drepo.findAll();
	}
	
	public long countDocs() {
		return drepo.count();
	}
	
	public Doctor findById(int docid) {
		return drepo.findById(docid).get();
	}
	
	public void deleteDoctor(int id) {
		Doctor doc=drepo.findById(id).get();
		doc.setIsactive(false);
		drepo.save(doc);
		uservice.deleteUser(id,"Doctor");
	}
	
	public String generateId() {
		return "doctor"+(countDocs()+1);
	}
}
