package com.hospital.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int appointmentid;
	private LocalDate date;
	private LocalTime time;
	@ManyToOne
	@JoinColumn(name="patientid")
	private Patient patient;
	@ManyToOne
	@JoinColumn(name="doctorid")
	private Doctor doctor;
	
	private String remarks;
	private String status="Booked";
	private String cancelBy;
	
	public String getCancelBy() {
		return cancelBy;
	}
	public void setCancelBy(String cancelBy) {
		this.cancelBy = cancelBy;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public LocalTime getTime() {
		return time;
	}
	public void setTime(LocalTime time) {
		this.time = time;
	}
	public int getAppointmentid() {
		return appointmentid;
	}
	public void setAppointmentid(int appointmentid) {
		this.appointmentid = appointmentid;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Appointment [appointmentid=" + appointmentid + ", date=" + date + ", time=" + time + ", patient="
				+ patient + ", doctor=" + doctor + ", remarks=" + remarks + ", status="
				+ status + "]";
	}
	
	
	
}
