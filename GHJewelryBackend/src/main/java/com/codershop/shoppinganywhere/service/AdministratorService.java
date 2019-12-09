package com.codershop.shoppinganywhere.service;

import com.codershop.shoppinganywhere.exception.AuthenticationFailedException;
import com.codershop.shoppinganywhere.model.Administrator;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface AdministratorService {
    Administrator authentication(String username, String password) throws AuthenticationFailedException, NoSuchAlgorithmException;

    List<Administrator> getAll();
}
