package com.hospital.models;

public class PatientBillDTO {
	private int appointmentid;
	private double doctorcharges;
	private double roomcharges;
	private double prescriptioncharges;
	private double tax;
	private double discount;
	private String cardno;
	private String nameoncard;
	public int getAppointmentid() {
		return appointmentid;
	}
	public void setAppointmentid(int appointmentid) {
		this.appointmentid = appointmentid;
	}

	public double getDoctorcharges() {
		return doctorcharges;
	}
	public void setDoctorcharges(double doctorcharges) {
		this.doctorcharges = doctorcharges;
	}
	public double getRoomcharges() {
		return roomcharges;
	}
	public void setRoomcharges(double roomcharges) {
		this.roomcharges = roomcharges;
	}
	public double getPrescriptioncharges() {
		return prescriptioncharges;
	}
	public void setPrescriptioncharges(double prescriptioncharges) {
		this.prescriptioncharges = prescriptioncharges;
	}
	public double getTax() {
		return tax;
	}
	public void setTax(double tax) {
		this.tax = tax;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
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
	
	
}
