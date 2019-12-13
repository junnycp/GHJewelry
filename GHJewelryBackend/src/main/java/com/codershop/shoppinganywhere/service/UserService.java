package com.codershop.shoppinganywhere.service;

import com.codershop.shoppinganywhere.common.generics.ComplexQueryService;
import com.codershop.shoppinganywhere.exception.AuthenticationFailedException;
import com.codershop.shoppinganywhere.model.User;

import java.security.NoSuchAlgorithmException;

public interface UserService extends ComplexQueryService<User,Long> {
    User authentication(String username, String password) throws AuthenticationFailedException, NoSuchAlgorithmException;
    boolean isDuplicate(String userName, Long idUser);
}
