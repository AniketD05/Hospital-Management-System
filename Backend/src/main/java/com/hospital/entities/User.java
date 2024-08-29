package com.hospital.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

	@Id
	private String userid;
	private String password;
	private String role;
	private String uname;
	private int uid;
	
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	public String getPassword() {
		return password;
	}
	@Override
	public String toString() {
		return "User [userid=" + userid + ", password=" + password + ", role=" + role + ", uname=" + uname + "]";
	}
}
