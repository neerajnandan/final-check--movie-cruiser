package com.cognizant.moviecruiser.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "us_id")
	private int id;
	@NotNull
	@Size(min = 4)
	@Column(name = "us_username")
	private String username;
	@NotNull
	@Column(name = "us_first_name")
	private String firstName;
	@NotNull
	@Column(name = "us_last_name")
	private String lastName;
	@NotNull
	@Size(min = 8)
	@Column(name = "us_password")
	private String password;

	@ManyToMany
	@JoinTable(name = "favorites", joinColumns = @JoinColumn(name = "fv_us_id"), inverseJoinColumns = @JoinColumn(name = "fv_pr_id"))
	private List<Movie> Movie;

	@ManyToMany
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "ur_us_id"), inverseJoinColumns = @JoinColumn(name = "ur_ro_id"))
	private List<Role> roles;

	public User() {
		super();
	}

	public List<Movie> getMovie() {
		return Movie;
	}

	public void setMovie(List<Movie> Movie) {
		this.Movie = Movie;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", password=" + password + ", Movie=" + Movie + ", roles=" + roles + "]";
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

}
