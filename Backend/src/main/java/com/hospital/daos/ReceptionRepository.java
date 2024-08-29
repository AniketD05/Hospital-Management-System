package com.hospital.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.entities.Reception;

@Repository
public interface ReceptionRepository extends JpaRepository<Reception, Integer> {
	
}
