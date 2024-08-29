package com.hospital.models;

import com.hospital.entities.Doctor;

public class DoctorDTO extends Doctor {

	private String userid;
	private String pwd;
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	
	
}
