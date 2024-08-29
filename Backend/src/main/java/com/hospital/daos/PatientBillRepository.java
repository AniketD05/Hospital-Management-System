package com.hospital.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.entities.Appointment;
import com.hospital.entities.PatientBill;

@Repository
public interface PatientBillRepository extends JpaRepository<PatientBill, Integer> {
	
	PatientBill findByAppointment(Appointment apt);
	
}
