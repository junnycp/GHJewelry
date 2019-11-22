package com.codershop.shoppinganywhere.service;

import com.codershop.shoppinganywhere.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUser();
    User insert(User user);
    User update(User user);
    boolean delete(Long idUser);
    User findById(Long idUser);
}
