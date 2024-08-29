package com.hospital.daos;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.entities.Appointment;
import com.hospital.entities.Doctor;
import com.hospital.entities.Patient;

@Repository
public interface AppintmentRepo extends JpaRepository<Appointment, Integer> {

	List<Appointment> findByDoctor(Doctor doctor);
	List<Appointment> findByDoctorAndDate(Doctor doctor,LocalDate date);
	List<Appointment> findByPatient(Patient patid);
}
