package com.hospital.models;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.beans.BeanUtils;

import com.hospital.entities.Appointment;

public class AppointmentDTO {
	private LocalDate date;
	private LocalTime time;
	private int patientid;
	private int doctorid;
	private String remarks;
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
	
	public int getPatientid() {
		return patientid;
	}
	public void setPatientid(int patientid) {
		this.patientid = patientid;
	}
	public int getDoctorid() {
		return doctorid;
	}
	public void setDoctorid(int doctorid) {
		this.doctorid = doctorid;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	@Override
	public String toString() {
		return "AppointmentDTO [date=" + date + ", time=" + time + ", patientid=" + patientid + ", doctorid=" + doctorid
				+ ", remarks=" + remarks + "]";
	}
	
	public static Appointment fromEntity(AppointmentDTO dto) {
		Appointment appt = new Appointment();
		BeanUtils.copyProperties(dto, appt);		
		return appt;
	}
	
	
}
