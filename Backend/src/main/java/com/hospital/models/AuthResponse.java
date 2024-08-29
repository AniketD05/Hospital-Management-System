package com.hospital.models;

public class AuthResponse {

	private String userid;
	private String role;
	private String uname;
	private int uid;
	
	public AuthResponse(String userid, String role, String uname,int uid) {
		this.userid = userid;
		this.role = role;
		this.uname = uname;
		this.uid=uid;
	}
	public AuthResponse() {
	System.out.println("in const");
	}
	
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
	
	
}
