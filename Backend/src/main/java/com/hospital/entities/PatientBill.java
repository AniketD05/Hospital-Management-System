package com.hospital.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class PatientBill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@OneToOne
	@JoinColumn(name = "appointment_id")
	private Appointment appointment;
	private double doctorcharges;
	private double prescriptioncharges;
	private String status; //Unpaid/Paid
	private String cardno;
	private String nameoncard;
	private LocalDate billdate;
	
	public PatientBill() {
		this.billdate=LocalDate.now();
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCardno() {
		return cardno;
	}
	public void setCardno(String cardno) {
		this.cardno = cardno;
	}
	public String getNameoncard() {
		return nameoncard;
	}
	public void setNameoncard(String nameoncard) {
		this.nameoncard = nameoncard;
	}
	public LocalDate getBilldate() {
		return billdate;
	}
	public void setBilldate(LocalDate billdate) {
		this.billdate = billdate;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public double getDoctorcharges() {
		return doctorcharges;
	}

	public void setDoctorcharges(double doctorcharges) {
		this.doctorcharges = doctorcharges;
	}

	public double getPrescriptioncharges() {
		return prescriptioncharges;
	}
	public void setPrescriptioncharges(double prescriptioncharges) {
		this.prescriptioncharges = prescriptioncharges;
	}

	public Appointment getAppointment() {
		return appointment;
	}
	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}
	
	
}
