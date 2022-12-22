package net.javaguides.springboot.model;

import java.util.Date;

public class Customer {

	private Integer id;

	private String name;

	private String lastName;

	private Date date;
	private String phone;
	private String bankAccount;

	public Customer() {
	}

	public Customer(Integer id,String name, String lastName, Date date, String phone,String bankAccount) {
		this.id=id;
		this.name = name;
		this.lastName = lastName;
		this.date = date;
		this.phone = phone;
		this.bankAccount = bankAccount;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}
}
