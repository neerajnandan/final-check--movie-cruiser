package com.cognizant.moviecruiser.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.moviecruiser.MovieCruiserApplication;
import com.cognizant.moviecruiser.exception.UserAlreadyExistsException;
import com.cognizant.moviecruiser.model.User;
import com.cognizant.moviecruiser.secuirty.AppUserDetailsService;

@RestController
@RequestMapping("/users")
public class UserController {
	private static final Logger LOGGER = LoggerFactory.getLogger(MovieCruiserApplication.class);

	@Autowired
	InMemoryUserDetailsManager inMemoryUserDetailsManager;

	@Autowired
	AppUserDetailsService appUserDetailsService;

	@PostMapping
	public boolean signup(@RequestBody @Valid User user) throws UserAlreadyExistsException {

		return appUserDetailsService.signup(user);

	}

}