package com.hospital.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.entities.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

	Optional<Patient> findByName(String name);

}
