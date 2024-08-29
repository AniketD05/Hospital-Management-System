package com.hospital.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.entities.Appointment;
import com.hospital.entities.Treatment;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, Integer> {

	Treatment findByAppointment(Appointment appointment);
}
