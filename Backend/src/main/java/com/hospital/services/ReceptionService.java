package com.hospital.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.daos.ReceptionRepository;
import com.hospital.entities.Doctor;
import com.hospital.entities.Reception;

@Service
public class ReceptionService {

	@Autowired ReceptionRepository drepo;
	@Autowired UserService uservice;
	
	public int saveReception(Reception doc) {
		return drepo.save(doc).getId();
	}
	
	public List<Reception> allReceptions(){
		return drepo.findAll();
	}
	
	public long countDocs() {
		return drepo.count();
	}
	
	public Reception findById(int docid) {
		return drepo.findById(docid).get();
	}
	
	public void deleteReception(int id) {
		Reception rec=findById(id);
		rec.setIsactive(false);
		drepo.save(rec);
		uservice.deleteUser(id,"Reception");
	}
	
	public String generateId() {
		return "reception"+(countDocs()+1);
	}
}
