package com.hospital.models;

public class UpdateStatusDTO {

	private int appointmentid;
	private String status;
	private String cancelby;
	public int getAppointmentid() {
		return appointmentid;
	}
	public void setAppointmentid(int appointmentid) {
		this.appointmentid = appointmentid;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCancelby() {
		return cancelby;
	}
	public void setCancelby(String cancelby) {
		this.cancelby = cancelby;
	}
	
	
}
